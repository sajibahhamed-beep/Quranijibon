import { NextResponse } from "next/server";
import { updateMessageStatus, deleteContactMessage } from "@/data/messagesStorage";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 });
    }

    await updateMessageStatus(id, status);
    return NextResponse.json({ success: true, message: "Message status updated" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update message status" },
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
    await deleteContactMessage(id);
    return NextResponse.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete message" },
      { status: 500 }
    );
  }
}
