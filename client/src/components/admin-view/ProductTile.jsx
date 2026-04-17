import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Edit3, Trash2, Package, Tag, AlertCircle } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const hasSalePrice = Number(product?.salePrice) > 0;

  return (
    <Card className="group h-full w-full rounded-none border-4 border-white bg-[#09090b] font-mono shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-default">
      <div className="flex h-full flex-col">
        
        {/* ASSET VISUALIZER */}
        <div className="relative border-b-4 border-white bg-zinc-900 p-4 overflow-hidden">
          <div className="flex h-[180px] items-center justify-center border-2 border-white bg-black p-2 relative">
             {/* Industrial Grid Overlay */}
             <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            
            <img
              src={product?.image}
              alt={product?.title}
              className="z-10 h-full w-full object-contain brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* CATEGORY IDENTIFIER */}
          <div className="absolute left-6 top-6 bg-white px-2 py-0.5 text-[8px] font-black uppercase text-black italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {product?.category || "UNSPECIFIED_ASSET"}
          </div>

          {/* SALE INDICATOR */}
          {hasSalePrice && (
            <div className="absolute right-6 top-6 flex items-center gap-1 bg-red-600 px-2 py-0.5 text-[8px] font-black uppercase text-white animate-pulse">
              <Tag size={8} />
              PRICE_DROP
            </div>
          )}
        </div>

        {/* METADATA FIELDS */}
        <CardContent className="flex flex-1 flex-col gap-4 p-5">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Entry_Title:</p>
            <h2 className="line-clamp-1 text-lg font-black uppercase italic tracking-tighter text-white cursor-text selection:bg-emerald-500 selection:text-black">
              {product?.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px border-2 border-white bg-white">
            {/* STOCK DATA */}
            <div className="bg-black p-3 hover:bg-zinc-900 transition-colors">
              <div className="flex items-center gap-1 mb-1">
                <Package size={10} className="text-zinc-600" />
                <p className="text-[9px] font-black text-zinc-600 uppercase">INVENTORY</p>
              </div>
              <p className="text-sm font-black text-white cursor-text">{product?.totalStock ?? 0}</p>
            </div>
            
            {/* VALUATION DATA */}
            <div className="bg-black p-3 hover:bg-zinc-900 transition-colors">
              <div className="flex items-center gap-1 mb-1">
                <AlertCircle size={10} className="text-zinc-600" />
                <p className="text-[9px] font-black text-zinc-600 uppercase">VALUATION</p>
              </div>
              <div className="flex flex-col">
                <p className={`text-sm font-black cursor-text ${hasSalePrice ? 'text-zinc-600 line-through text-[10px]' : 'text-emerald-400'}`}>
                  ${product?.price}
                </p>
                {hasSalePrice && (
                  <p className="text-sm font-black text-emerald-400 cursor-text">
                    ${product?.salePrice}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        {/* COMMAND INTERFACE */}
        <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-0">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="h-12 rounded-none border-2 border-white bg-white text-black font-black uppercase hover:bg-emerald-500 hover:border-emerald-500 transition-all cursor-pointer active:translate-y-1"
          >
            <Edit3 size={16} className="mr-2" />
            EDIT
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            className="h-12 rounded-none border-2 border-white bg-transparent text-white font-black uppercase hover:bg-red-600 hover:border-red-600 transition-all cursor-pointer active:translate-y-1"
          >
            <Trash2 size={16} className="mr-2" />
            DEL
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;