import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all published blog posts (public)
router.get('/', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;
    
    let where = { status: 'PUBLISHED' };
    
    let searchCondition = {};
    if (search) {
      searchCondition = {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } }
        ]
      };
    }
    
    if (category) {
      where.category = category;
    }

    const [posts, count] = await Promise.all([
      prisma.blogPost.findMany({
        where: { ...where, ...searchCondition },
        include: {
          author: {
            select: { name: true }
          }
        },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.blogPost.count({
        where: { ...where, ...searchCondition }
      })
    ]);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single blog post (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: { name: true }
        }
      }
    });
    
    if (!post || post.status !== 'PUBLISHED') {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment views
    await prisma.blogPost.update({
      where: { id: req.params.id },
      data: { views: { increment: 1 } }
    });

    res.json(post);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all blog posts for admin
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let where = {};
    
    let searchCondition = {};
    if (search) {
      searchCondition = {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const [posts, count] = await Promise.all([
      prisma.blogPost.findMany({
        where: { ...where, ...searchCondition },
        include: {
          author: {
            select: { name: true }
          }
        },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.blogPost.count({
        where: { ...where, ...searchCondition }
      })
    ]);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get admin blog posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create blog post (admin only)
router.post('/', adminAuth, upload.single('image'), [
  body('title').notEmpty().trim(),
  body('excerpt').notEmpty().trim(),
  body('content').notEmpty().trim(),
  body('category').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postData = {
      ...req.body,
      authorId: req.user.id
    };
    
    if (req.file) {
      postData.image = `/uploads/blog/${req.file.filename}`;
    }

    // Parse tags if provided
    if (postData.tags && typeof postData.tags === 'string') {
      postData.tags = JSON.parse(postData.tags);
    }

    const post = await prisma.blogPost.create({
      data: postData,
      include: {
        author: {
          select: { name: true }
        }
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update blog post (admin only)
router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.image = `/uploads/blog/${req.file.filename}`;
    }

    // Parse tags if provided
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = JSON.parse(updateData.tags);
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        author: {
          select: { name: true }
        }
      }
    });

    res.json(updatedPost);
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete blog post (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await prisma.blogPost.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;