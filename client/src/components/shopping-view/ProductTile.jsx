import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {

  return (
    <Card
      onClick={() => handleGetProductDetails(product?._id)}
      className="w-full max-w-sm mx-auto cursor-pointer group rounded-none border-2 border-black/5 hover:border-black transition-all duration-300 shadow-none hover:shadow-[8px_8px_0px_rgba(0,0,0,0.05)]"
    >
      <div className="relative overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />

        {/* STOCK & SALE BADGE LOGIC */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product?.totalStock === 0 ? (
            <Badge className="bg-red-600 text-white rounded-none border-none uppercase font-black text-[9px] tracking-widest px-2 py-1">
              Out_Of_Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="bg-orange-600 text-white rounded-none border-none uppercase font-black text-[9px] tracking-widest px-2 py-1">
              Low_Buffer: {product?.totalStock}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="bg-black text-white rounded-none border-none uppercase font-black text-[9px] tracking-widest px-2 py-1">
              Discount_Active
            </Badge>
          ) : null}
        </div>
      </div>

      <CardContent className="p-4">
        {/* BRAND & CATEGORY LABELS */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">
            {categoryOptionsMap[product?.category] || "General"}
          </span>
          <span className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">
            {brandOptionsMap[product?.brand] || "Aura_Line"}
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-black uppercase italic tracking-tighter transform -skew-x-12 mb-4 leading-tight">
          {product?.title}
        </h2>

        {/* PRICING */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-black/40 uppercase tracking-tight">Valuation</span>
            <div className="flex items-center gap-2">
              <span
                className={`${product?.salePrice > 0 ? "line-through text-black/20 text-sm" : "text-xl"
                  } font-black italic`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-xl font-black italic text-red-600">
                  ${product?.salePrice}
                </span>
              ) : null}
            </div>
          </div>

          <div className="h-8 w-8 border border-black/5 flex items-center justify-center">
            <div className="h-1 w-1 bg-black rotate-45" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        {/* VIEW DETAILS BUTTON - flex-1 prevents overflow */}
        <Button
          variant="outline"
          className="flex-1 rounded-none border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all h-12"
          onClick={(e) => {
            e.stopPropagation();
            handleGetProductDetails(product?._id);
          }}
        >
          Details
        </Button>

        {/* ADD TO CART LOGIC - flex-1 prevents overflow */}
        {product?.totalStock === 0 ? (
          <Button
            className="flex-1 rounded-none bg-black/5 text-black/20 cursor-not-allowed font-black uppercase text-[10px] h-12"
            disabled
          >
            Void
          </Button>
        ) : (
          <Button
            className="flex-1 rounded-none bg-black text-white hover:bg-zinc-800 font-black uppercase text-[10px] tracking-widest transition-all h-12"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product?._id, product?.totalStock);
            }}
          >
            Add_To_Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;