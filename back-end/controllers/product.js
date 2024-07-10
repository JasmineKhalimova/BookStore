const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "image not uploaded"
            });
        }
        let product = new Product(fields);
        
        if(fields.photo) {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType =  files.photo.type;
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(result);
        });
    });
};