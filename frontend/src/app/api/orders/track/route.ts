export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Order } from "@/lib/models";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const order = await Order.findOne({ orderNumber: params.id });
    if (!order) {
      return NextResponse.json({ message: "Siparish bulunamadi." }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}