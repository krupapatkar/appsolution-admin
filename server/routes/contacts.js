import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Create contact (public)
router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim(),
  body('captcha').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactData = {
      ...req.body,
      ipAddress: req.ip
    };

    const contact = await prisma.contact.create({
      data: contactData
    });
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all contacts (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let where = {};
    
    let searchCondition = {};
    if (search) {
      searchCondition = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { message: { contains: search, mode: 'insensitive' } }
        ]
      };
    }
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    const [contacts, count, unreadCount] = await Promise.all([
      prisma.contact.findMany({
        where: { ...where, ...searchCondition },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contact.count({
        where: { ...where, ...searchCondition }
      }),
      prisma.contact.count({
        where: { status: 'UNREAD' }
      })
    ]);

    res.json({
      contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
      unreadCount
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single contact (admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id }
    });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Mark as read if it was unread
    if (contact.status === 'UNREAD') {
      await prisma.contact.update({
        where: { id: req.params.id },
        data: { status: 'READ' }
      });
    }

    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update contact status (admin only)
router.patch('/:id/status', adminAuth, [
  body('status').isIn(['UNREAD', 'READ', 'REPLIED'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id }
    });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const updatedContact = await prisma.contact.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    
    res.json(updatedContact);
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete contact (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: req.params.id }
    });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await prisma.contact.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;