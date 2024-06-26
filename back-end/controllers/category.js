const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Middleware to find category by ID
exports.categoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id).exec();
        if (!category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    } catch (err) {
        return res.status(400).json({
            error: 'Category does not exist'
        });
    }
};

// Create category
exports.create = async (req, res) => {
    const category = new Category(req.body);
    try {
        const data = await category.save();
        res.json({ data });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};

// Read category
exports.read = (req, res) => {
    return res.json(req.category);
};
