import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Order } from "@/lib/models";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    const { items, shippingAddress, totalAmount } = await req.json();

    if (!items || items.length === 0 || !shippingAddress || !totalAmount) {
      return NextResponse.json({ message: "Geçersiz sipariş verisi." }, { status: 400 });
    }

    const orderId = "ORDER-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const newOrder = await Order.create({
      user: session?.user?.id || undefined, // Guest or Logged in
      items: items.map((i: any) => ({
        product: i.id,
        name: i.name,
        quantity: i.qty,
        price: i.price
      })),
      totalAmount,
      status: "paid", // Simulated as paid in checkout
      conversationId: orderId,
      shippingAddress,
      billingAddress: shippingAddress, // Default same as shipping
    });

    return NextResponse.json({ 
      message: "Sipariş başarıyla oluşturuldu.", 
      orderId: newOrder._id,
      trackingCode: orderId
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
