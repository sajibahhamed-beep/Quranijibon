import { NextResponse } from "next/server";
import {
  updateStudentStatus,
  updateStudent,
  deleteStudent,
  getStudents,
} from "@/data/studentsStorage";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.status) {
      await updateStudentStatus(id, body.status);
      return NextResponse.json({ success: true, message: "Status updated successfully" });
    }

    if (body.student) {
      await updateStudent(body.student);
      return NextResponse.json({ success: true, message: "Student updated successfully" });
    }

    return NextResponse.json(
      { success: false, message: "No valid update field provided" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update student" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteStudent(id);
    return NextResponse.json({ success, message: "Student deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete student" },
      { status: 500 }
    );
  }
}
