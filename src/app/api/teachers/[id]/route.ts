import { NextResponse } from "next/server";
import { updateTeacherStatus, updateTeacher } from "@/data/teachersStorage";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.status) {
      const success = await updateTeacherStatus(id, body.status);
      if (success) {
        return NextResponse.json({ success: true, message: "Status updated successfully" });
      }
    }

    if (body.teacher) {
      const success = await updateTeacher(body.teacher);
      if (success) {
        return NextResponse.json({ success: true, message: "Teacher updated successfully" });
      }
    }

    return NextResponse.json(
      { success: false, message: "Teacher record not found" },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update teacher" },
      { status: 500 }
    );
  }
}
