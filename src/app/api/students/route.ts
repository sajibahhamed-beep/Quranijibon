import { NextResponse } from "next/server";
import { getStudents, addStudent } from "@/data/studentsStorage";
import { addNotification } from "@/data/notificationsStorage";
import { sendStudentApplicationEmail } from "@/lib/sendEmail";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const students = await getStudents();
    return NextResponse.json({ success: true, students });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("POST /api/students json parse error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    if (!body || !body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: "Name and Phone are required" },
        { status: 400 }
      );
    }

    const newStudent = await addStudent({
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: body.email ? String(body.email).trim() : "",
      package: body.package || "বিনামূল্যে",
      schedule: body.schedule || "সুবিধাজনক সময়ে",
      teacherPreference: body.teacherPreference || "যে কোনটি",
      status: "নতুন আবেদন",
      notes: body.notes || "",
    });

    try {
      await addNotification({
        title: `নতুন ভর্তি আবেদন: ${newStudent.name}`,
        message: `${newStudent.name} (${newStudent.phone}) '${newStudent.package}' কোর্সে নতুন আবেদন করেছেন। শিক্ষক পছন্দ: ${newStudent.teacherPreference}, সময়সূচী: ${newStudent.schedule}`,
        category: "admission",
        link: "/admin/students",
      });
    } catch (e) {
      console.error("Error creating notification for student registration:", e);
    }

    // Send email notification to admins (non-blocking, fail-safe)
    try {
      sendStudentApplicationEmail({
        name: newStudent.name,
        phone: newStudent.phone,
        email: newStudent.email,
        package: newStudent.package,
        schedule: newStudent.schedule,
        teacherPreference: newStudent.teacherPreference,
        notes: newStudent.notes,
      }).catch((err) => console.error("Student email sending error:", err));
    } catch (emailErr) {
      console.error("Student email trigger error:", emailErr);
    }

    return NextResponse.json(
      { success: true, message: "Student registered successfully", student: newStudent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/students:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to register student" },
      { status: 500 }
    );
  }
}
