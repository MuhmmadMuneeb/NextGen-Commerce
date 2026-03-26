import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { PlusIcon, Lock } from "lucide-react"; // Fixed: 'Lock' instead of 'lockIcon'

function ShoppingProductTile({ product }) {
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock > 0 && product?.totalStock < 10;
  const isOnSale = product?.salePrice > 0;

  return (
    <Card className="group relative w-full max-w-sm mx-auto rounded-none border-[1px] border-black/10 bg-white hover:border-black transition-all duration-300 shadow-none overflow-hidden">
      
      {/* 01. IMAGE SECTION WITH SCANNER OVERLAY */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f3f3]">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />

        {/* Tactical Status Tab */}
        <div className="absolute top-0 left-0 z-10">
          {isOutOfStock ? (
            <div className="bg-black text-white text-[9px] font-black px-3 py-2 tracking-[0.2em]">
              ERR // NULL_STOCK
            </div>
          ) : isLowStock ? (
            <div className="bg-yellow-400 text-black text-[9px] font-black px-3 py-2 tracking-[0.2em]">
              LOW_AVAIL // {product?.totalStock}_UNIT
            </div>
          ) : isOnSale ? (
            <div className="bg-black text-white text-[9px] font-black px-3 py-2 tracking-[0.2em]">
              PRICE_ADJ // SALE
            </div>
          ) : (
            <div className="bg-black/5 text-black/40 text-[9px] font-black px-3 py-2 tracking-[0.2em]">
              ID_{product?._id.substring(0, 4).toUpperCase()}
            </div>
          )}
        </div>

        {/* Decorative Corner Bracket */}
        <div className="absolute bottom-3 right-3 w-5 h-5 border-r-[1px] border-b-[1px] border-black/20 group-hover:border-black group-hover:w-6 group-hover:h-6 transition-all duration-300" />
      </div>

      {/* 02. DATA CONTENT */}
      <CardContent className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="h-[1px] w-4 bg-black/20" />
             <p className="text-[9px] font-bold text-black/40 uppercase tracking-[0.2em]">
              {brandOptionsMap[product?.brand]} // {categoryOptionsMap[product?.category]}
            </p>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter leading-none italic group-hover:not-italic transition-all duration-300">
            {product?.title}
          </h2>
        </div>

        <div className="flex items-center gap-8 border-t border-black/5 pt-5">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-black/30 uppercase tracking-[0.3em] mb-1">Base_Price</span>
            <span className={`text-xl font-black tracking-tighter ${isOnSale ? "line-through text-black/20" : "text-black"}`}>
              ${product?.price}
            </span>
          </div>
          
          {isOnSale && (
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-black/40 uppercase tracking-[0.3em] mb-1">Market_Adj</span>
              <span className="text-xl font-black text-black tracking-tighter">
                ${product?.salePrice}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      {/* 03. INTERACTION FOOTER */}
      <CardFooter className="p-0 border-t border-black/10">
        {isOutOfStock ? (
          <Button 
            disabled
            className="w-full h-16 rounded-none bg-slate-50 text-black/20 font-black uppercase text-[10px] tracking-[0.3em] cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            ACCESS_DENIED
          </Button>
        ) : (
          <Button 
            className="w-full h-16 rounded-none bg-white text-black hover:bg-black hover:text-white font-black uppercase text-[10px] tracking-[0.4em] transition-all flex items-center justify-center gap-3 group/btn"
          >
            <PlusIcon className="w-3.5 h-3.5 transition-transform duration-500 group-hover/btn:rotate-90" />
            COMMIT_TO_CART
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;