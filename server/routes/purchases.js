import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { adminAuth } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create purchase (public)
router.post('/', [
  body('productId').isUUID(),
  body('customerName').notEmpty().trim(),
  body('customerEmail').isEmail().normalizeEmail(),
  body('amount').isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Verify product exists and get current price
    const product = await prisma.product.findUnique({
      where: { id: req.body.productId }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Verify amount matches product price
    if (parseFloat(req.body.amount) !== parseFloat(product.price)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const purchaseData = {
      ...req.body,
      transactionId: `TXN_${Date.now()}_${uuidv4().substr(0, 8)}`,
      paymentStatus: 'COMPLETED', // In real app, this would be 'PENDING' until PayPal confirms
      ipAddress: req.ip
    };

    const purchase = await prisma.purchase.create({
      data: purchaseData,
      include: {
        product: {
          select: { name: true, downloadUrl: true }
        }
      }
    });
    
    // Increment product sales count
    await prisma.product.update({
      where: { id: req.body.productId },
      data: { sales: { increment: 1 } }
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error('Create purchase error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get purchase by transaction ID (public - for download access)
router.get('/transaction/:transactionId', async (req, res) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { 
        transactionId: req.params.transactionId,
        paymentStatus: 'COMPLETED'
      },
      include: {
        product: {
          select: { name: true, downloadUrl: true }
        }
      }
    });

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found or not completed' });
    }

    res.json(purchase);
  } catch (error) {
    console.error('Get purchase error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Track download (public)
router.post('/download/:transactionId', async (req, res) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { 
        transactionId: req.params.transactionId,
        paymentStatus: 'COMPLETED'
      }
    });

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found or not completed' });
    }

    // Increment download count and update last download time
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        downloadCount: { increment: 1 },
        lastDownload: new Date()
      }
    });

    res.json({ message: 'Download tracked successfully' });
  } catch (error) {
    console.error('Track download error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all purchases (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let where = {};
    
    let searchCondition = {};
    if (search) {
      searchCondition = {
        OR: [
          { customerName: { contains: search, mode: 'insensitive' } },
          { customerEmail: { contains: search, mode: 'insensitive' } },
          { transactionId: { contains: search, mode: 'insensitive' } },
          { 
            product: {
              name: { contains: search, mode: 'insensitive' }
            }
          }
        ]
      };
    }
    
    if (status && status !== 'all') {
      where.paymentStatus = status.toUpperCase();
    }

    const [purchases, count] = await Promise.all([
      prisma.purchase.findMany({
        where: { ...where, ...searchCondition },
        include: {
          product: {
            select: { name: true }
          }
        },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.purchase.count({
        where: { ...where, ...searchCondition }
      })
    ]);

    // Calculate stats
    const stats = await prisma.purchase.aggregate({
      where: { paymentStatus: 'COMPLETED' },
      _count: { id: true },
      _sum: { 
        amount: true,
        downloadCount: true
      }
    });

    const pendingCount = await prisma.purchase.count({ 
      where: { paymentStatus: 'PENDING' } 
    });

    res.json({
      purchases,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
      stats: {
        totalRevenue: parseFloat(stats._sum.amount) || 0,
        totalSales: stats._count.id || 0,
        totalDownloads: stats._sum.downloadCount || 0,
        pendingOrders: pendingCount
      }
    });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update purchase status (admin only)
router.patch('/:id/status', adminAuth, [
  body('paymentStatus').isIn(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const purchase = await prisma.purchase.findUnique({
      where: { id: req.params.id }
    });
    
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    const updatedPurchase = await prisma.purchase.update({
      where: { id: req.params.id },
      data: { paymentStatus: req.body.paymentStatus }
    });
    
    res.json(updatedPurchase);
  } catch (error) {
    console.error('Update purchase status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;