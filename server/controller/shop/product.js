import Product from "../../models/Product.model.js";

export const allProducts =async (req,res)=>{
    try {
        const allProduct=await Product.find()
        if(!allProduct){
            return res.status(400).json({success:false,message:"failed to fetch all products"})
        }
        res.status(200).json({success:true,message:"all products fetched",data:allProduct})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}