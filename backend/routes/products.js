import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/insert',async(req,res)=>{
  const seedProducts = async () => {
    try {
    const products = req.body;
    const result = await Product.insertMany(products); // Insert multiple products at once
    res.status(201).send(result);
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  }
  seedProducts();
})



export default router;