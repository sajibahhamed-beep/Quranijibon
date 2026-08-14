import { NextResponse } from "next/server";
import { getTeachers, addTeacher } from "@/data/teachersStorage";
import { addNotification } from "@/data/notificationsStorage";
import { sendTeacherApplicationEmail } from "@/lib/sendEmail";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const teachers = await getTeachers();
    return NextResponse.json({ success: true, teachers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch teachers" },
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
      console.error("POST /api/teachers json parse error:", parseError);
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

    const newTeacher = await addTeacher({
      name: String(body.name).trim(),
      gender: body.gender || "পুরুষ",
      phone: String(body.phone).trim(),
      email: body.email ? String(body.email).trim() : "",
      specialization: body.qualification || body.specialization || "তাজবীদ ও কুরআন শিক্ষক",
      experience: body.experience || "১-২ বছর",
      workType: body.workType || "স্বল্প সম্মানী",
      notes: body.message || body.notes || "",
      status: "নতুন আবেদন",
    });

    // Create unread notification for Admin
    try {
      await addNotification({
        title: `নতুন শিক্ষক আবেদন: ${newTeacher.name}`,
        message: `${newTeacher.name} (${newTeacher.gender}, ফোন: ${newTeacher.phone}) শিক্ষক হিসেবে যুক্ত হতে আবেদন করেছেন। যোগ্যতা: ${newTeacher.specialization}`,
        category: "teacher",
        link: "/admin/teachers",
      });
    } catch (e) {
      console.error("Error adding notification for teacher application:", e);
    }

    // Send email notification to admins (fail-safe and awaited so serverless runtimes don't cut off connection)
    try {
      await sendTeacherApplicationEmail({
        name: newTeacher.name,
        gender: newTeacher.gender,
        phone: newTeacher.phone,
        email: newTeacher.email,
        qualification: newTeacher.specialization,
        experience: newTeacher.experience,
        workType: newTeacher.workType,
        notes: newTeacher.notes,
      });
    } catch (emailErr) {
      console.error("Teacher email dispatch error:", emailErr);
    }

    return NextResponse.json(
      { success: true, message: "Teacher application submitted successfully", teacher: newTeacher },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/teachers:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to submit teacher application" },
      { status: 500 }
    );
  }
}
