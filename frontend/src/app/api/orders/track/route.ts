import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Order } from "@/lib/models";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "Sipariş kodu gerekli." }, { status: 400 });
    }

    // Try finding by MongoDB ID or ConversationId (Tracking Code)
    const order = await Order.findOne({
      $or: [
        { _id: id.length === 24 ? id : null }, // valid ObjectId
        { conversationId: id }
      ]
    });

    if (!order) {
      return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ order });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
