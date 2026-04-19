import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { productList } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      const getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        const getTotalStock =
          getCurrentProductIndex > -1
            ? productList[getCurrentProductIndex]?.totalStock
            : getCartItem?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getTotalStock && getQuantity + 1 > getTotalStock) {
            toast.error(`Stock_Limit: Only ${getQuantity} units available.`);
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id || user?._id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Manifest updated.");
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id || user?._id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Unit purged from manifest.");
      }
    });
  }

  return (
    <div className="flex gap-4 items-start border-b border-black/5 pb-4 group font-mono">
      {/* IMAGE SECTION */}
      <div className="h-20 w-20 bg-slate-50 border border-black/10 p-1 rounded-none overflow-hidden flex-shrink-0">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* INFO SECTION */}
      <div className="flex-1">
        <h3 className="text-xs font-black uppercase tracking-tight leading-none">
          {cartItem?.title}
        </h3>

        {/* QUANTITY CONTROLS */}
        <div className="flex items-center gap-3 mt-3">
          <Button
            variant="outline"
            className="h-6 w-6 rounded-none border-black p-0 hover:bg-black hover:text-white"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus size={12} />
          </Button>
          <span className="text-[10px] font-black">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-6 w-6 rounded-none border-black p-0 hover:bg-black hover:text-white"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus size={12} />
          </Button>
        </div>

        <p className="text-sm font-black mt-2 italic">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
      </div>

      {/* DELETE ACTION */}
      <button
        onClick={() => handleCartItemDelete(cartItem)}
        className="text-black/20 hover:text-red-600 self-center transition-colors p-2"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default UserCartItemsContent;