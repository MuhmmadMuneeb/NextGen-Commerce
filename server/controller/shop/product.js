import Product from "../../models/Product.model.js";

export const allProducts = async (req, res) => {
  try {
    // Destructure without forcing arrays yet, as req.query comes in as strings
    const { category, brand, sortBy = "price-lowtohigh" } = req.query;
    
    let filters = {};

    // Use a more robust check: ensure the string exists and isn't just whitespace
    if (category && category.trim() !== "") {
      filters.category = { $in: category.split(",") };
    }

    if (brand && brand.trim() !== "") {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1; // Fixed: was sort.price
        break;
      case "title-ztoa":
        sort.title = -1; // Fixed: was sort.price
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({ 
      success: true, 
      message: "Products fetched successfully", 
      data: products 
    });
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
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