import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { allProducts } from "@/store/shop/Shop-product-slice";
import { addToCart } from "@/store/cart-slice";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { productList, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  // Fetch Products
  useEffect(() => {
    dispatch(allProducts({ filterParams: {}, sortParams: "price-hightolow" }));
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    const userId = user?.id || user?._id;
    if (!userId) {
      toast.error("Authentication required to add items.");
      return;
    }

    dispatch(addToCart({ userId, productId, quantity: 1 })).then((res) => {
      if (res?.payload?.success) {
        toast.success("Unit synchronized with cart.");
      }
    });
  };

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-6">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
          Latest_Deployments
        </h2>
        <span className="text-[10px] font-bold opacity-40 mb-2 uppercase tracking-widest">
          {productList.length} Units Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-zinc-100 animate-pulse border-2 border-zinc-200" />
          ))
        ) : (
          productList.slice(0, 8).map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/shop/details/${product._id}`)}
              className="group relative flex flex-col cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100 border-2 border-black mb-4 relative">
                <img
                  src={product.image}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  alt={product.title}
                />
                <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW_DETAILS
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-black uppercase text-sm tracking-tight truncate">{product.title}</h3>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                  {product.category || 'Apparel'}
                </p>
                <p className="text-xl font-black italic">${product.price}</p>
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToCart(product._id);
                }}
                className="mt-4 w-full rounded-none bg-black text-white hover:bg-zinc-800 font-black uppercase text-[10px] tracking-widest py-6 cursor-pointer"
              >
                <ShoppingBag size={14} className="mr-2" />
                Add_To_Manifest
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductGrid;