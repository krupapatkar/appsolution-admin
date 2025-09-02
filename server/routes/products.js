import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const offset = (page - 1) * limit;
    
    let where = { status: 'ACTIVE' };
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    let searchCondition = {};
    if (search) {
      searchCondition = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const [products, count] = await Promise.all([
      prisma.product.findMany({
        where: { ...where, ...searchCondition },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({
        where: { ...where, ...searchCondition }
      })
    ]);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id, status: 'ACTIVE' }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products for admin
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let where = { status: 'ACTIVE' };
    
    let searchCondition = {};
    if (search) {
      searchCondition = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const [products, count] = await Promise.all([
      prisma.product.findMany({
        where: { ...where, ...searchCondition },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({
        where: { ...where, ...searchCondition }
      })
    ]);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create product (admin only)
// Create product (admin only)
router.post('/', adminAuth, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'screenshots', maxCount: 5 },
  { name: 'download', maxCount: 1 }
]), [
  body('name').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('price').isFloat({ min: 0 }),
  body('category').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const productData = { ...req.body };

    // Safe file uploads
    if (req.files?.image) productData.image = `/uploads/products/${req.files.image[0].filename}`;
    if (req.files?.screenshots) productData.screenshots = req.files.screenshots.map(f => `/uploads/products/${f.filename}`);
    if (req.files?.download) productData.downloadUrl = `/uploads/downloads/${req.files.download[0].filename}`;

    // Parse JSON fields safely
    ['technologies','features','requirements','support'].forEach(field => {
      if (productData[field] && typeof productData[field] === 'string') {
        try { productData[field] = JSON.parse(productData[field]); } catch { }
      }
    });

    if (productData.price) productData.price = parseFloat(productData.price);

    const product = await prisma.product.create({ data: productData });
    res.status(201).json(product);

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Update product (admin only)
router.put('/:id', adminAuth, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'screenshots', maxCount: 5 },
  { name: 'download', maxCount: 1 }
]), async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updateData = { ...req.body };
    
    // Handle file uploads
   // Handle file uploads safely
if (req.files?.image) {
  updateData.image = `/uploads/products/${req.files.image[0].filename}`;
}

if (req.files?.screenshots) {
  updateData.screenshots = req.files.screenshots.map(file => 
    `/uploads/products/${file.filename}`
  );
}

if (req.files?.download) {
  updateData.downloadUrl = `/uploads/downloads/${req.files.download[0].filename}`;
}


    // Parse JSON fields
    if (updateData.technologies && typeof updateData.technologies === 'string') {
      updateData.technologies = JSON.parse(updateData.technologies);
    }
    if (updateData.features && typeof updateData.features === 'string') {
      updateData.features = JSON.parse(updateData.features);
    }
    if (updateData.requirements && typeof updateData.requirements === 'string') {
      updateData.requirements = JSON.parse(updateData.requirements);
    }
    if (updateData.support && typeof updateData.support === 'string') {
      updateData.support = JSON.parse(updateData.support);
    }
    
    // Convert price to float
    if (updateData.price) {
      updateData.price = parseFloat(updateData.price);
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: updateData
    });
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.product.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;