import mongoose, { Schema, Document, Model } from 'mongoose';

// USER MODEL
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// PRODUCT MODEL
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  seoTitle: { type: String },
  seoDescription: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

// ORDER MODEL
export interface IOrder extends Document {
  user?: mongoose.Types.ObjectId;
  items: any[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'failed' | 'shipped' | 'delivered';
  paymentId?: string;
  conversationId?: string;
  shippingAddress: any;
  billingAddress: any;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed', 'shipped', 'delivered'] },
  paymentId: { type: String },
  conversationId: { type: String },
  shippingAddress: { type: Object, required: true },
  billingAddress: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
