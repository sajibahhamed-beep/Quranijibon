import { NextResponse } from "next/server";
import { updateDonationStatus, deleteDonation } from "@/data/donationsStorage";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 });
    }

    await updateDonationStatus(id, status);
    return NextResponse.json({ success: true, message: "Donation status updated" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update donation status" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteDonation(id);
    return NextResponse.json({ success, message: "Donation deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete donation" }, { status: 500 });
  }
}
