import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();


// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    console.log(orders.products);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post('/create', async (req, res) => {
  try {
    const { products, totalPrice, paymentId } = req.body;
    const newOrder = new Order({
      products:products,
      totalPrice:totalPrice,
      paymentId:paymentId,
      status: 'order placed'
    });
    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order status
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;