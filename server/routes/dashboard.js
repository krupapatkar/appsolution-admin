import express from 'express';
import prisma from '../lib/prisma.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard stats (admin only)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    // Revenue and sales stats
    const revenueStats = await prisma.purchase.aggregate({
      where: { paymentStatus: 'COMPLETED' },
      _sum: { amount: true },
      _count: { id: true }
    });

    // Product stats
    const [totalProducts, activeProducts] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: 'ACTIVE' } })
    ]);

    // Download stats
    const downloadStats = await prisma.purchase.aggregate({
      where: { paymentStatus: 'COMPLETED' },
      _sum: { downloadCount: true }
    });

    // Contact stats
    const unreadContacts = await prisma.contact.count({
      where: { status: 'UNREAD' }
    });

    // Recent sales (last 5)
    const recentSales = await prisma.purchase.findMany({
      where: { paymentStatus: 'COMPLETED' },
      include: {
        product: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Recent contacts (last 3)
    const recentContacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    // For monthly revenue, we'll use a simpler approach for now
    const monthlyRevenue = [];

    res.json({
      stats: {
        totalRevenue: parseFloat(revenueStats._sum.amount) || 0,
        totalSales: revenueStats._count.id || 0,
        activeProducts: activeProducts || 0,
        totalDownloads: downloadStats._sum.downloadCount || 0,
        unreadContacts: unreadContacts || 0
      },
      recentSales,
      recentContacts,
      monthlyRevenue
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;