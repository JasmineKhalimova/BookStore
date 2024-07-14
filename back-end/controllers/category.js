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

exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;
    Product.find({ category }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
            });
        } else {
            category.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Category deleted'
                });
            });
        }
    });
};

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};