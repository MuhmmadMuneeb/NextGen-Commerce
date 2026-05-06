import Product from "../../models/Product.model.js";

export const allProducts = async (req, res) => {
  try {

    const categoryQuery = req.query.category || req.query.filterParams?.category;
    const brandQuery = req.query.brand || req.query.filterParams?.brand;
    const sortBy = req.query.sortBy || req.query.sortParams || "price-lowtohigh";
    const search = req.query.search || "";

    let filters = {};
    console.log("search", search)

    const parseFilter = (val) => {
      if (!val) return null;
      if (Array.isArray(val)) return val;
      if (typeof val === "string" && val.trim() !== "") return val.split(",");
      return null;
    };

    const categories = parseFilter(categoryQuery);
    if (categories) {
      filters.category = { $in: categories };
    }

    const brands = parseFilter(brandQuery);
    if (brands) {
      filters.brand = { $in: brands };
    }
    if (search) {
      filters.search = { $regex: search, $options: "i" };
    }
    console.log("filters", filters)


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
    console.error("Error fetching product details:", error);
    res.status(500).json({ success: false, message: error.message })
  }
}