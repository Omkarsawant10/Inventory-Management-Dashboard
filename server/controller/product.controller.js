import { Product } from "../model/product.model.js";


export const addProduct = async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    if (!name || !quantity || !price || !category) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const product = await Product.create({
      name,
      quantity,
      price,
      category,
      createdBy: req.id,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};



export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.id }).sort({ createdAt: -1 });

    res.status(200).json({
      products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, category } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, createdBy: req.id },
      { name, quantity, price, category },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
      success: true
    });

  } catch (error) {
    console.error("Get Single Product Error:", error);
    res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      createdBy: req.id,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
