const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Skill = require('../models/Skill');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

// @route   POST /api/skills
// @desc    Create a new skill
// @access  Private
router.post('/', [
  auth,
  body('name')
    .notEmpty()
    .withMessage('Skill name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Skill name must be between 2 and 100 characters'),
  body('category')
    .isIn(['Programming', 'Design', 'Music', 'Language', 'Sports', 'Cooking', 'Art', 'Business', 'Other'])
    .withMessage('Invalid category'),
  body('type')
    .isIn(['offered', 'wanted'])
    .withMessage('Type must be either offered or wanted'),
  body('level')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
    .withMessage('Invalid level'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters')
], handleValidationErrors, async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      level,
      type,
      tags
    } = req.body;

    const skill = await Skill.create({
      name,
      category,
      description,
      level,
      type,
      tags: tags || [],
      owner: req.user.id
    });

    await skill.populate('owner', 'name email avatar rating');

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      skill
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/skills
// @desc    Get all skills with filtering and pagination
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {
      type,
      category,
      level,
      q,
      page = 1,
      limit = 10,
      owner
    } = req.query;

    const query = {};

    // Filter by type (offered/wanted)
    if (type) query.type = type;

    // Filter by category
    if (category) query.category = category;

    // Filter by level
    if (level) query.level = level;

    // Filter by owner
    if (owner) query.owner = owner;

    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }

    // Only active skills
    query.isActive = true;

    const skills = await Skill.find(query)
      .populate('owner', 'name email avatar rating location')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Skill.countDocuments(query);

    res.json({
      success: true,
      skills,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/skills/my
// @desc    Get current user's skills
// @access  Private
router.get('/my', auth, async (req, res) => {
  try {
    const { type } = req.query;
    const query = { owner: req.user.id, isActive: true };

    if (type) query.type = type;

    const skills = await Skill.find(query)
      .populate('owner', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      skills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/skills/search
// @desc    Search skills by various criteria
// @access  Private
router.get('/search', auth, async (req, res) => {
  try {
    const {
      q,
      category,
      type,
      level,
      excludeOwner,
      page = 1,
      limit = 10
    } = req.query;

    if (!q && !category) {
      return res.status(400).json({
        success: false,
        message: 'Search query or category is required'
      });
    }

    const query = { isActive: true };

    // Exclude current user's skills if specified
    if (excludeOwner === 'true') {
      query.owner = { $ne: req.user.id };
    }

    // Filter by type
    if (type) query.type = type;

    // Filter by category
    if (category) query.category = category;

    // Filter by level
    if (level) query.level = level;

    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }

    const skills = await Skill.find(query)
      .populate('owner', 'name email avatar rating location')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Skill.countDocuments(query);

    res.json({
      success: true,
      skills,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/skills/:id
// @desc    Get skill by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
      .populate('owner', 'name email avatar rating location bio');

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    if (!skill.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Skill not available'
      });
    }

    res.json({
      success: true,
      skill
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private
router.put('/:id', [
  auth,
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Skill name must be between 2 and 100 characters'),
  body('category')
    .optional()
    .isIn(['Programming', 'Design', 'Music', 'Language', 'Sports', 'Cooking', 'Art', 'Business', 'Other'])
    .withMessage('Invalid category'),
  body('level')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
    .withMessage('Invalid level'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters')
], handleValidationErrors, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    // Check if user owns the skill
    if (skill.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this skill'
      });
    }

    const {
      name,
      category,
      description,
      level,
      tags
    } = req.body;

    // Update fields
    if (name) skill.name = name;
    if (category) skill.category = category;
    if (description !== undefined) skill.description = description;
    if (level) skill.level = level;
    if (tags) skill.tags = tags;

    await skill.save();
    await skill.populate('owner', 'name email avatar rating');

    res.json({
      success: true,
      message: 'Skill updated successfully',
      skill
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill (soft delete)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    // Check if user owns the skill
    if (skill.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this skill'
      });
    }

    // Soft delete
    skill.isActive = false;
    await skill.save();

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/skills/categories/stats
// @desc    Get skill statistics by category
// @access  Private
router.get('/categories/stats', auth, async (req, res) => {
  try {
    const stats = await Skill.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: {
            category: '$category',
            type: '$type'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.category',
          offered: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'offered'] }, '$count', 0]
            }
          },
          wanted: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'wanted'] }, '$count', 0]
            }
          },
          total: { $sum: '$count' }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;