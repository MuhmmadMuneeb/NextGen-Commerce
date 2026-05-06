import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useDispatch, useSelector } from "react-redux";
import { allProducts, fetchProductDetails } from "@/store/shop/Shop-product-slice";
import { addToCart } from "@/store/cart-slice";
import HeroSlider from "@/components/shopping-view/HeroSlider";
import ShoppingProductTile from "../../components/shopping-view/ProductTile";
import ProductDetailsDialog from "@/components/shopping-view/productDetails";
import { toast } from "sonner";
import { Globe, Zap, Cpu, Activity } from "lucide-react";

const ShoppingHome = () => {
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, isLoading, productDetails } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart || { cartItems: { items: [] } });
  useEffect(() => {
    dispatch(allProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleGetProductDetails = useCallback((getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  }, [dispatch]);

  const handleAddToCart = useCallback((getCurrentProductId, totalStock) => {
    const userId = user?.id || user?._id;

    if (!userId) {
      toast.error("Please login to access the cart registry.");
      return;
    }

    const currentCartItem = (cartItems?.items || []).find(
      (item) => item.productId === getCurrentProductId
    );

    if ((currentCartItem?.quantity || 0) + 1 > totalStock) {
      toast.error(`Insufficient Units: Only ${totalStock} available.`);
      return;
    }

    dispatch(
      addToCart({
        userId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Unit successfully added to manifest.");
      }
    });
  }, [dispatch, user, cartItems]);

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <div className="border-b-2 border-black px-6 py-3 flex justify-between items-center sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-black animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Aura_Core_v4.0.1 // Online</span>
        </div>
      </div>

      <HeroSlider />

      <section className="p-8 md:p-16 bg-white">
        <div className="flex flex-col mb-12">
          <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.4em] flex items-center gap-2">
            <Activity size={12} /> System_Featured_Units //
          </span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic transform -skew-x-6">
            New_Arrivals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-slate-100 animate-pulse border-2 border-black/5" />
            ))
          ) : (
            productList && productList.slice(0, 4).map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </section>

      {/* ... (Specs section and Marquee remains same) */}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingHome;