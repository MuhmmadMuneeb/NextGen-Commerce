import Product from "../../models/Product.model.js";

export const allProducts = async (req, res) => {
    try {
        const {category = [], brand = [], sortBy = "price-lowtohigh"} = req.query
        let filters = {}
        if (category.length) {
            filters.category = { $in: category.split(",") }
        }
        if (brand.length) {
            filters.brand = { $in: brand.split(",") }
        }
        let sort = {}
        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1
                break;
            case "price-hightolow":
                sort.price = -1
                break;
            case "title-atoz":
                sort.price = 1
                break;
            case "title-ztoa":
                sort.price = -1
                break;
            default:
                sort.price = 1
                break;
        }
        const products = await Product.find(filters).sort(sort)
        res.status(200).json({ success: true, message: "all products fetched", data: products })
    } catch (error) {

        console.log("error in filter")
        res.status(500).json({ success: false, message: error.message })
    }
}
export const productDetails = async (req, res) => {
    try {
        
        const products = await Product.findById(req.params.id)
        if (!products) {
            return res.status(400).json({ success: false, message: "Product not found" })
        }
        res.status(200).json({ success: true, message: "all products fetched", data: products })
    } catch (error) {

        console.log("error in filter")
        res.status(500).json({ success: false, message: error.message })
    }
}