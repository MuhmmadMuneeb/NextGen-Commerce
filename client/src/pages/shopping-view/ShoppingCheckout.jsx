import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { fetchCartItems } from "@/store/cart-slice"; // Adjusted to match your store keys
import { Activity, CreditCard, PackageCheck } from "lucide-react";

const getItemUnitPrice = (item) =>
  item?.salePrice > 0 ? item.salePrice : item?.price || 0;

const ShoppingCheckout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  // Checking both shopCart and cart based on your previous logs
  const cartState = useSelector((state) => state.shopCart || state.cart);
  const { isLoading } = cartState;

  const userId = user?.id || user?._id;
  
  // Normalizing the array as we did in the Header
  const items = Array.isArray(cartState?.cartItems) 
    ? cartState.cartItems 
    : cartState?.cartItems?.items || [];

  const totalItemsCount = items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + getItemUnitPrice(item) * (item?.quantity || 0),
    0
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  if (!userId) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white font-mono p-6">
        <div className="max-w-md w-full border-4 border-black p-8 shadow-[12px_12px_0px_rgba(0,0,0,0.1)]">
          <Activity className="mb-4 animate-pulse" />
          <h1 className="text-3xl font-black uppercase italic tracking-tighter -skew-x-12 mb-4">
            AUTH_REQUIRED
          </h1>
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-8">
            Access to checkout manifest requires active session credentials.
          </p>
          <Button asChild className="w-full h-12 bg-black text-white rounded-none uppercase font-black tracking-widest text-xs hover:bg-zinc-800">
            <Link to="/auth/login">Initialize_Login</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white font-mono pt-24 pb-12 px-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER SECTION */}
        <div className="mb-12 border-b-4 border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 bg-black animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Final_Sequence</span>
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter -skew-x-12">
              CHECKOUT<span className="text-black/20">/</span>PROCESS
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Timestamp</p>
            <p className="text-xs font-bold">{new Date().toISOString()}</p>
          </div>
        </div>

        {!isLoading && items.length === 0 ? (
          <div className="border-2 border-dashed border-black/20 py-32 text-center">
            <h2 className="text-xl font-black uppercase tracking-widest text-black/20 italic">
              MANIFEST_IS_EMPTY // 0_UNITS_DETECTED
            </h2>
            <Button asChild variant="outline" className="mt-8 rounded-none border-black border-2 font-black uppercase text-xs">
              <Link to="/shop/listing">Return_To_Archive</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* LEFT: ITEM REGISTRY */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <PackageCheck size={20} />
                <h2 className="text-lg font-black uppercase tracking-widest">Unit_Registry</h2>
                <div className="flex-1 h-[1px] bg-black/10" />
                <span className="text-xs font-black bg-black text-white px-3 py-1">
                  {totalItemsCount} UNITS
                </span>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="group flex flex-col sm:flex-row gap-6 border border-black/10 p-4 hover:border-black transition-colors relative"
                  >
                    <div className="h-24 w-24 bg-slate-50 border border-black/5 overflow-hidden flex-shrink-0">
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-tight leading-none group-hover:italic transition-all">
                          {item?.title}
                        </h3>
                        <p className="mt-2 text-[10px] font-bold text-black/40 uppercase tracking-widest">
                          ID: {item?.productId?.slice(-8)} // QTY: {item?.quantity}
                        </p>
                      </div>
                      <p className="text-xs font-black italic">
                        UNIT_VAL: ${getItemUnitPrice(item).toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right flex flex-col justify-end">
                      <p className="text-xl font-black italic tracking-tighter">
                        ${(getItemUnitPrice(item) * item?.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <aside className="relative">
              <div className="sticky top-32 border-4 border-black p-8 bg-white shadow-[12px_12px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-8">
                  <CreditCard size={18} />
                  <h2 className="text-lg font-black uppercase tracking-widest italic">VALUATION</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Gross_Total</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Logistics_Fee</span>
                    <span className="font-bold text-green-600">0.00 [FREE]</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Net_Payable</span>
                      <span className="text-4xl font-black italic tracking-tighter leading-none">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-3">
                  <Button className="w-full h-14 bg-black text-white hover:bg-zinc-800 rounded-none uppercase font-black tracking-[0.2em] text-xs transition-all active:scale-95" disabled={items.length === 0}>
                    Execute_Payment_Order
                  </Button>

                  <Button asChild variant="outline" className="w-full h-12 rounded-none border-2 border-black font-black uppercase tracking-widest text-[10px]">
                    <Link to="/shop/listing">Modify_Archive_Units</Link>
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-slate-50 border border-black/5">
                  <p className="text-[8px] leading-relaxed text-black/40 uppercase font-bold text-center">
                    Secure transaction protocol active. All data encrypted via Aura_Core AES-256.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingCheckout;