const Product = require("../Model/productModel");

//!Create Product--Admin

exports.createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Create Product Successfully",
    product,
  });
};
//! Get all Product
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    message: "Get All Products Successfully !",
    products,
  });
};
//! Update Product --Admin
exports.updateProducts = async (req, res) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    message: "Update Products Successfully !",
    product,
  });
};
//! Delete Product -- Admin
exports.DeleteProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();
  res.status(200).json({
    message: "Delete Products Successfully !",
    product,
  });
};
