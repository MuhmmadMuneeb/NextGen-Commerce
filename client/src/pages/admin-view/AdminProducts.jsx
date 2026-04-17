import React, { useEffect, useState } from "react";
import { Plus, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addProductFormElements } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProductImageUpload from "@/components/admin-view/Image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/Admin-product-slice/Index";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/ProductTile";
import CommonForm from "../comman/Form";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salePrice: 0,
  totalStock: 0,
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  function resetProductForm() {
    setCurrentEditedId(null);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl(null);
    setOpenCreateProductsDialog(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    if (imageLoadingState) {
      toast.error("SYSTEM_BUSY: Image upload in progress");
      return;
    }

    const finalImageUrl = uploadedImageUrl || formData.image;
    if (!finalImageUrl) {
      toast.error("VALIDATION_ERROR: Image required");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      salePrice: Number(formData.salePrice),
      totalStock: Number(formData.totalStock),
      image: finalImageUrl,
    };

    const action = currentEditedId
      ? editProduct({ id: currentEditedId, formData: payload })
      : addNewProduct(payload);

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        resetProductForm();
        dispatch(fetchAllProducts());
        toast.success("DATABASE_UPDATED");
      } else {
        toast.error(data?.payload || "EXECUTION_FAILED");
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData((prev) => ({ ...prev, image: uploadedImageUrl }));
    }
  }, [uploadedImageUrl]);

  return (
    <div className="w-full font-mono">
      {/* Header Action */}
      <div className="mb-10 flex items-center justify-between border-b-4 border-black pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter transform -skew-x-12">
            INVENTORY<span className="text-black/20">/</span>MGMT
          </h1>
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">System_Product_Database.exe</p>
        </div>
        <Button
          onClick={() => {
            resetProductForm();
            setOpenCreateProductsDialog(true);
          }}
          className="rounded-none border-4 border-black bg-black px-8 py-6 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:bg-zinc-800 hover:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <Plus className="mr-2 h-5 w-5" />
          ADD_NEW_ITEM
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {productList?.length > 0 ? (
          productList.map((product) => (
            <AdminProductTile
              key={product._id}
              product={product}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
            />
          ))
        ) : (
          <div className="col-span-full border-4 border-dashed border-zinc-300 p-20 text-center">
            <Terminal className="mx-auto mb-4 text-zinc-300" size={48} />
            <p className="font-black uppercase text-zinc-400">No_Data_Found_In_Registry</p>
          </div>
        )}
      </div>

      <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
        <SheetContent
          side="right"
          className="w-full border-l-4 border-black bg-white p-0 sm:max-w-md"
        >
          <div className="flex h-full flex-col">
            {/* Sheet Header */}
            <SheetHeader className="border-b-4 border-black bg-black p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 text-black">
                  <Zap size={24} fill="black" />
                </div>
                <div>
                  <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter text-white">
                    {currentEditedId ? "EDIT_ENTRY" : "NEW_ENTRY"}
                  </SheetTitle>
                  <SheetDescription className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Product_Protocol_Initialize
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            {/* Form Scroll Area */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="mb-8 border-l-4 border-black pl-4">
                <p className="text-sm font-bold uppercase leading-tight">
                  Update database parameters. Ensure all pricing values are valid integers before execution.
                </p>
              </div>

              <div className="space-y-8">
                {/* Custom Styled Form */}
                <CommonForm
                  formControls={addProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                  buttonText={currentEditedId ? "PUSH_UPDATE" : "SAVE_TO_REGISTRY"}
                  formClassName="space-y-6"
                  fieldClassName="space-y-2"
                  labelClassName="text-[10px] font-black uppercase tracking-widest text-black/50"
                  inputClassName="w-full rounded-none border-2 border-black bg-white px-4 py-3 text-black font-bold placeholder:text-zinc-300 focus:bg-zinc-50 outline-none transition-colors"
                  buttonClassName="w-full rounded-none border-4 border-black bg-black py-6 font-black uppercase italic tracking-widest text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                />

                <div className="mt-8 pt-8 border-t-2 border-black">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-4 block">Asset_Upload</label>
                  <ProductImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    imageLoadingState={imageLoadingState}
                    uploadedImageUrl={uploadedImageUrl}
                    setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState}
                    isEditMode={Boolean(currentEditedId)}
                    isCustomStyling
                  />
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;