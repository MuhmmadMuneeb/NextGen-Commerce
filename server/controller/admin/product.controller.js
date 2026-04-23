import { imageUploadUtil } from "../../helper/cloudinary.js";
import Product from "../../models/Product.model.js";

export const imageHandleUpload = async (req, res) => {
    try {
          if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }
        const result = await imageUploadUtil(req.file);
        res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//adding products
export const addProducts = async (req, res) => {
    try {
        const { title, image, description, category, brand, price, salePrice, totalStock, averageReview } = req.body
        const newProduct = new Product({ title, image, description, category, brand, price, salePrice, totalStock, averageReview })
        if (!title || !image || !description || !category || !brand || !price || !salePrice || !totalStock) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        
        await newProduct.save()
        res.status(201).json({ success: true, message: "Product added successfully", newProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//fetch all products
export const allProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        if (!allProducts) {
            return res.status(400).json({ success: false, message: "failed to fetch all products" })

        }
        res.status(200).json({ success: true, message: "all products fetched", data: allProducts })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//edit product
export const editProducts = async (req, res) => {
    try {
        const { title, image, description, category, brand, price, salePrice, totalStock, averageReview } = req.body
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { title, image, description, category, brand, price, salePrice, totalStock, averageReview }, { new: true })

        res.status(201).json({ success: true, message: "Product updated successfully", data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//delete product
export const deleteProducts = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(201).json({ success: true, message: "Product deleted successfully", data: deletedProduct })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}