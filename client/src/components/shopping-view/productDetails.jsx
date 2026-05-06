import React, { memo } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ShoppingCart, Box, Star } from "lucide-react";

// Wrap in memo to prevent re-renders when the parent Home page state changes
const ProductDetailsDialog = memo(({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) => {
  if (!productDetails) return null;

  const hasSalePrice = productDetails?.salePrice && productDetails?.salePrice > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[100] grid grid-cols-1 md:grid-cols-2 gap-0 p-0 max-w-[95vw] lg:max-w-[1000px] bg-white border-4 border-black rounded-none overflow-hidden font-mono">
        
        {/* LEFT SIDE: Image Section */}
        <div className="relative border-b-4 md:border-b-0 md:border-r-4 border-black bg-zinc-100">
          <img
            src={productDetails?.image || "/placeholder.png"}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          {productDetails?.totalStock < 10 && productDetails?.totalStock > 0 && (
            <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Low_Buffer_Alert: {productDetails?.totalStock}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Information Section */}
        <div className="flex flex-col p-8 bg-white overflow-y-auto max-h-[80vh] md:max-h-[600px]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-black/40 uppercase tracking-[0.3em]">
               <Box size={12}/> Unit_ID: {productDetails?._id?.slice(-8)}
            </div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none transform -skew-x-6">
              {productDetails?.title}
            </h1>
          </div>

          <div className="flex gap-2 mt-4">
            <Badge variant="outline" className="rounded-none border-black border-2 font-black uppercase text-[9px]">
              {productDetails?.category}
            </Badge>
            <Badge variant="outline" className="rounded-none border-black border-2 font-black uppercase text-[9px]">
              {productDetails?.brand}
            </Badge>
          </div>

          <p className="text-sm text-black/70 mt-6 leading-relaxed border-l-2 border-black/10 pl-4 py-2 italic">
            "{productDetails?.description}"
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-4 mt-8 p-4 bg-zinc-50 border-2 border-black/5">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase opacity-40">Price_Structure</span>
              <div className="flex items-center gap-3">
                <p className={`text-3xl font-black ${hasSalePrice ? "line-through text-black/20 text-xl" : "text-black"}`}>
                  ${productDetails?.price}
                </p>
                {hasSalePrice && (
                  <p className="text-4xl font-black text-red-600 italic">
                    ${productDetails?.salePrice}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart Action */}
          <div className="mt-8">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full h-16 rounded-none bg-zinc-100 text-black/20 border-2 border-black/5 cursor-not-allowed uppercase font-black" disabled>
                Stock_Depleted
              </Button>
            ) : (
              <Button
                className="w-full h-16 rounded-none bg-black text-white hover:bg-zinc-800 transition-all font-black uppercase tracking-widest text-xs flex gap-3"
                onClick={() => handleAddToCart?.(productDetails?._id, productDetails?.totalStock)}
              >
                <ShoppingCart size={18} /> Initiate_Purchase_Protocol
              </Button>
            )}
          </div>

          <Separator className="my-8 bg-black/10" />

          {/* Logistics/Review Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-2">
               <Star size={14}/> Node_Feedback_Logs
            </h2>
            
            <div className="space-y-3">
              {[
                { name: "Ali Khan", comment: "Unit performance exceeds specifications." },
                { name: "Sara Ahmed", comment: "Interface design is optimal. Highly recommend." }
              ].map((review, i) => (
                <div key={i} className="p-3 border-b-2 border-black/5 last:border-0 hover:bg-zinc-50 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold uppercase">{review.name}</span>
                    <span className="text-[8px] text-zinc-400">STATUS: VERIFIED</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 uppercase leading-tight">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default ProductDetailsDialog;