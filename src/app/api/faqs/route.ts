import { NextResponse } from "next/server";
import { getFaqsData, createFaqItem } from "@/data/faqsStorage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const activeOnly = searchParams.get("activeOnly");

    let faqs = await getFaqsData();

    if (activeOnly === "true") {
      faqs = faqs.filter((f) => f.isActive);
    }

    if (category && category !== "সব") {
      faqs = faqs.filter((f) => f.category === category);
    }

    return NextResponse.json({ success: true, faqs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.question || !body.answer) {
      return NextResponse.json(
        { success: false, message: "Question and Answer are required" },
        { status: 400 }
      );
    }

    const createdFaq = await createFaqItem(body);
    return NextResponse.json(
      { success: true, message: "FAQ created successfully", faq: createdFaq },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "move" && body.id && typeof body.targetOrder === "number") {
      const { moveFaqPosition } = await import("@/data/faqsStorage");
      const faqs = await moveFaqPosition(body.id, body.targetOrder);
      return NextResponse.json({
        success: true,
        message: "FAQ এর অবস্থান পরিবর্তন সম্পন্ন হয়েছে",
        faqs,
      });
    }

    if (body.action === "reorder" && Array.isArray(body.orders)) {
      const { reorderFaqs } = await import("@/data/faqsStorage");
      const faqs = await reorderFaqs(body.orders);
      return NextResponse.json({
        success: true,
        message: "FAQ ক্রম হালনাগাদ সম্পন্ন হয়েছে",
        faqs,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action or parameters" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update FAQ order" },
      { status: 500 }
    );
  }
}
