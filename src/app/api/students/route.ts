import { NextResponse } from "next/server";
import { getStudents, addStudent } from "@/data/studentsStorage";
import { recordUserInteraction } from "@/data/notifyClient";

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
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: "Name and Phone are required" },
        { status: 400 }
      );
    }

    const newStudent = await addStudent({
      name: body.name,
      phone: body.phone,
      email: body.email || "",
      package: body.package || "বিনামূল্যে",
      schedule: body.schedule || "সুবিধাজনক সময়ে",
      teacherPreference: body.teacherPreference || "যে কোনটি",
      status: "নতুন আবেদন",
      notes: body.notes,
    });

    try {
      await recordUserInteraction({
        title: `নতুন ভর্তি আবেদন: ${newStudent.name}`,
        message: `${newStudent.name} (${newStudent.phone}) '${newStudent.package}' কোর্সে নতুন আবেদন করেছেন। শিক্ষক পছন্দ: ${newStudent.teacherPreference}, সময়সূচী: ${newStudent.schedule}`,
        category: "admission",
        link: "/admin/students",
      });
    } catch (e) {
      console.error("Error creating notification for student registration", e);
    }

    return NextResponse.json(
      { success: true, message: "Student registered successfully", student: newStudent },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to register student" },
      { status: 500 }
    );
  }
}
