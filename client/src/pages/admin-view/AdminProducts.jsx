import React, { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonForm from "../comman/Form";
import { addProductFormElements } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  function onSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div className="w-full p-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            Products
          </h1>
          <p className="text-sm text-slate-400">
            Manage your store inventory
          </p>
        </div>

        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>

      </div>

      {/* PRODUCTS GRID (placeholder) */}

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-slate-100 font-medium">
            Sample Product
          </h2>
          <p className="text-sm text-slate-400">
            $120
          </p>
        </div>

      </div>

      {/* DRAWER */}

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={setOpenCreateProductsDialog}
      >
        <SheetContent
          side="right"
          className="w-full overflow-auto border-l border-slate-800 bg-slate-950 px-0 sm:max-w-md"
        >
          <div className="min-h-full flex flex-col">

            {/* HEADER */}

            <SheetHeader className="border-b border-slate-800 px-6 py-5">

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <SheetTitle className="text-lg font-semibold text-slate-100">
                    Add Product
                  </SheetTitle>

                  <SheetDescription className="text-sm text-slate-400">
                    Add a new product to your store catalog
                  </SheetDescription>
                </div>

              </div>

            </SheetHeader>

            {/* FORM SECTION */}

            <div className="flex-1 px-6 py-6">

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

                <CommonForm
                  formControls={addProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                  buttonText="Save Product"

                  formClassName="space-y-4"
                  fieldClassName="space-y-1"

                  labelClassName="text-xs font-medium text-slate-300"

                  inputClassName="h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-white placeholder:text-slate-400 transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"

                  buttonClassName="mt-3 h-10 w-full rounded-md bg-emerald-500 text-sm font-medium text-white hover:bg-emerald-600"
                />

              </div>

            </div>

          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;