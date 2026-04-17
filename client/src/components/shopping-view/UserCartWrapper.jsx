import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Trash2 } from "lucide-react";

function UserCartWrapper({ cartItems, openCartSheet, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
    0
  );

  return (
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <SheetContent className="sm:max-w-md z-[1000] w-full rounded-none border-l-4 border-black p-0 flex flex-col font-mono">
        <SheetHeader className="p-6 border-b border-black">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-black animate-pulse" />
            <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter transform -skew-x-12">
              CART<span className="text-black/20">/</span>MANIFEST
            </SheetTitle>
          </div>
          <p className="text-[9px] font-bold text-black/40 uppercase tracking-[0.3em] mt-1">
            Buffer_Units: {cartItems?.length || 0}
          </p>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="mt-8 space-y-6">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.productId} className="flex gap-4 items-start border-b border-black/5 pb-4 group">
                  <div className="h-20 w-20 bg-slate-50 border border-black/10 p-1 rounded-none overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-black uppercase tracking-tight leading-none">{item.title}</h3>
                    <p className="text-[10px] text-black/40 mt-1 uppercase">QTY: {item.quantity}</p>
                    <p className="text-sm font-black mt-2 italic">${(item.salePrice || item.price) * item.quantity}</p>
                  </div>
                  <button className="text-black/20 hover:text-red-600 self-center transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">DATA_NOT_FOUND</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t-2 border-black">
          <div className="flex justify-between items-end mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Total_Valuation</span>
            <span className="text-3xl font-black italic tracking-tighter">${totalAmount.toFixed(2)}</span>
          </div>
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full h-14 bg-black text-white hover:bg-zinc-800 rounded-none uppercase font-black tracking-[0.2em] text-xs"
            disabled={cartItems.length === 0}
          >
            Initiate_Checkout_Sequence
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default UserCartWrapper;