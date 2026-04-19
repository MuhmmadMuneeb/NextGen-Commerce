import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import UserCartItemsContent from "./UserCartItemsContent";

function UserCartWrapper({ cartItems, openCartSheet, setOpenCartSheet }) {
  const navigate = useNavigate();

  // cartItems is already an array passed from Header
  const manifestItems = cartItems || [];

  const totalAmount = manifestItems.reduce(
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
            Buffer_Units: {manifestItems.length}
          </p>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="mt-8 space-y-6">
            {manifestItems.length > 0 ? (
              manifestItems.map((item) => (
                <UserCartItemsContent key={item.productId || item._id} cartItem={item} />
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">
                  DATA_NOT_FOUND // EMPTY_REGISTRY
                </p>
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
            disabled={manifestItems.length === 0}
          >
            Initiate_Checkout_Sequence
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default UserCartWrapper;