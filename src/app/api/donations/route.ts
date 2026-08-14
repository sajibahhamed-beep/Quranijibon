import { NextResponse } from "next/server";
import { getDonations, addDonation, updateDonationStatus } from "@/data/donationsStorage";
import { addNotification } from "@/data/notificationsStorage";
import { sendDonationAlertEmail } from "@/lib/sendEmail";

export async function GET() {
  try {
    const donations = await getDonations();
    return NextResponse.json({ success: true, donations });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch donations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donorName, phone, amount, paymentMethod, trxId, type, sponsoredStudent } = body;

    if (!donorName || !phone || !amount) {
      return NextResponse.json(
        { success: false, message: "Name, phone and amount are required" },
        { status: 400 }
      );
    }

    const parsedAmount = typeof amount === "string"
      ? parseFloat(amount.replace(/[^0-9.]/g, "")) || 0
      : Number(amount) || 0;

    const newDonation = await addDonation({
      donorName: String(donorName).trim(),
      phone: String(phone).trim(),
      amount: parsedAmount,
      type: type || "সাদাকা",
      paymentMethod: paymentMethod || "bKash",
      trxId: trxId ? String(trxId).trim() : "",
      sponsoredStudent: sponsoredStudent ? String(sponsoredStudent).trim() : undefined,
      status: "অপেক্ষমাণ",
    });

    // Record Admin Notification
    try {
      await addNotification({
        title: `নতুন সাদাকা ও হাদিয়া: ৳${parsedAmount}`,
        message: `${donorName} (${phone}) ${paymentMethod || "bKash"} এর মাধ্যমে ৳${parsedAmount} অনুদান প্রদান করেছেন। TrxID: ${trxId || "নেই"}`,
        category: "donation",
        link: "/admin/donations",
      });
    } catch (notifErr) {
      console.warn("Notification recording warning:", notifErr);
    }

    // Send production email notification
    try {
      await sendDonationAlertEmail({
        id: newDonation.id,
        donorName: newDonation.donorName,
        phone: newDonation.phone,
        amount: newDonation.amount,
        paymentMethod: newDonation.paymentMethod,
        trxId: newDonation.trxId,
        type: newDonation.type,
      });
    } catch (mailErr) {
      console.error("Donation email delivery failed:", mailErr);
    }

    return NextResponse.json({ success: true, donation: newDonation });
  } catch (error) {
    console.error("Error creating donation record:", error);
    return NextResponse.json(
      { success: false, message: "Failed to record donation" },
      { status: 500 }
    );
  }
}
