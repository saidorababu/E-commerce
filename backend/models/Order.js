import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;