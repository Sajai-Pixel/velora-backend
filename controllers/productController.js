import Product from "../models/productModel.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";

const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            stock,
            price,
            discountPercentage,
            tags,
            brand,
            sku,
            sizes
        } = req.body
        // Check required fields
        if (!title || !price) {
            return res.status(400).json({
                message: 'Title and price are required'
            })
        }
        // Check images
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'At least one image is required'
            })
        }
        if (req.files.length > 4) {
            return res.status(400).json({
                message: 'Maximum 4 images are allowed'
            })
        }
        // Upload images to Cloudinary
        const uploadResults = await Promise.all(
            req.files.map((file) =>
                uploadOnCloudinary(file.path)
            )
        )
        // Check failed uploads
        const imageUrls = uploadResults
            .filter((result) => result !== null)
            .map((result) => result.secure_url)
        if (imageUrls.length === 0) {
            return res.status(500).json({
                message: 'Image upload failed'
            })
        }
        // Convert tags into array
        const parsedTags = Array.isArray(tags)
            ? tags
            : tags
                ? [tags]
                : []
        // Convert sizes into array
        const parsedSizes = Array.isArray(sizes)
            ? sizes
            : sizes
                ? [sizes]
                : []
        // Create product
        const product = await Product.create({
            title,
            description,
            category,
            stock,
            price,
            discountPercentage,
            tags: parsedTags,
            brand,
            sku,
            sizes: parsedSizes,
            images: imageUrls
        })
        return res.status(201).json({
            message: 'Product created successfully',
            product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort('-createdAt')
        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const {
            title,
            description,
            category,
            stock,
            price,
            discountPercentage,
            tags,
            brand,
            sku,
            sizes
        } = req.body

        // Find existing product
        const existingProduct = await Product.findById(id)
        if (!existingProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        // Convert tags into array
        const parsedTags = Array.isArray(tags)
            ? tags
            : tags
                ? [tags]
                : []

        // Convert sizes into array
        const parsedSizes = Array.isArray(sizes)
            ? sizes
            : sizes
                ? [sizes]
                : []
                
        // Keep existing images by default
        let imageUrls = existingProduct.images
        // If new images are uploaded
        if (req.files && req.files.length > 0) {
            if (req.files.length > 4) {
                return res.status(400).json({
                    message: 'Maximum 4 images are allowed'
                })
            }
            const uploadResults = await Promise.all(
                req.files.map((file) =>
                    uploadOnCloudinary(file.path)
                )
            )
            imageUrls = uploadResults
                .filter((result) => result !== null)
                .map((result) => result.secure_url)
            if (imageUrls.length === 0) {
                return res.status(500).json({
                    message: 'Image upload failed'
                })
            }
        }
        // Update product
        const product = await Product.findByIdAndUpdate(
            id,
            {
                title,
                description,
                category,
                stock,
                price,
                discountPercentage,
                tags: parsedTags,
                brand,
                sku,
                sizes: parsedSizes,
                images: imageUrls
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        )
        return res.status(200).json({
            message: 'Product updated successfully',
            product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        return res.status(200).json({
            message: 'Product deleted successfully'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }