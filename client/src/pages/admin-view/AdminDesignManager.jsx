import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Slider Slices
import {
  getSliders,
  addSlider,
  deleteSlider,
  updateSlider,
  toggleSliderStatus, // Added this import
} from "@/store/slider-slice/index";

// Popup Slices
import {
  getAllPopups,
  createPopup,
  updatePopup,
  deletePopup,
  togglePopupActive,
} from "@/store/popup-slice/index";

import { toast } from "sonner";

// Components
import ProductImageUpload from "@/components/admin-view/Image-upload";
import CommonForm from "../comman/Form";
import AdminSliderCard from "../../components/admin-view/AdminSliderCard";
import AdminPopupMonitor from "../../components/admin-view/AdminPopupMonitor";

// Config & Icons
import { sliderFormControls, popupFormControls } from "@/config";
import { RefreshCw } from "lucide-react";

function AdminDesignManager() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isSliderPath = pathname.includes("slider");

  const { sliders, isLoading: sliderLoading } = useSelector((state) => state.slider);
  const { popups, isLoading: popupLoading } = useSelector((state) => state.popup);

  const isLoading = sliderLoading || popupLoading;

  // IMAGE & FORM STATE
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const [sliderFormData, setSliderFormData] = useState({
    title: "",
    subtitle: "",
    linkUrl: "",
    priority: 0,
  });

  const [popupFormData, setPopupFormData] = useState({
    triggerId: "",
    headline: "",
    type: "INFO",
    displayDelay: 3000,
    description: "",
  });

  // INITIAL DATA FETCH
  useEffect(() => {
    resetForm();
    if (isSliderPath) {
      dispatch(getSliders());
    } else {
      dispatch(getAllPopups());
    }
  }, [dispatch, isSliderPath]);

  // RESET FORM
  const resetForm = () => {
    setCurrentEditedId(null);
    setUploadedImageUrl("");
    setImageFile(null);
    setSliderFormData({ title: "", subtitle: "", linkUrl: "", priority: 0 });
    setPopupFormData({
      triggerId: "",
      headline: "",
      type: "INFO",
      displayDelay: 3000,
      description: "",
    });
  };

  // EDIT INITIALIZATION
  const handleEditInitiate = (asset) => {
    setCurrentEditedId(asset._id);
    setImageFile(null); // Reset binary file so it doesn't accidentally re-upload old files

    const image = isSliderPath ? asset.image : asset.imageUrl;
    setUploadedImageUrl(image);

    if (isSliderPath) {
      setSliderFormData({
        title: asset.title,
        subtitle: asset.subtitle,
        linkUrl: asset.linkUrl,
        priority: asset.priority,
      });
    } else {
      setPopupFormData({
        triggerId: asset.triggerId,
        headline: asset.headline,
        type: asset.type,
        displayDelay: asset.displayDelay,
        description: asset.description,
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SUBMIT HANDLER (Fixes Image Swapping & 400 Errors)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!uploadedImageUrl) {
      toast.error("Please upload an image first.");
      return;
    }

    const data = new FormData();

    if (isSliderPath) {
      data.append("title", sliderFormData.title);
      data.append("subtitle", sliderFormData.subtitle);
      data.append("linkUrl", sliderFormData.linkUrl);
      data.append("priority", sliderFormData.priority);

      if (imageFile) {
        data.append("image", imageFile);
      } else {
        data.append("image", uploadedImageUrl);
      }

      const action = currentEditedId
        ? updateSlider({ id: currentEditedId, formData: data })
        : addSlider(data);

      dispatch(action).then((res) => {
        if (res.payload?.success) {
          toast.success(currentEditedId ? "Slider Updated" : "Slider Created");
          dispatch(getSliders()); // Refresh list
          resetForm();
        }
      });
    } else {
      data.append("triggerId", popupFormData.triggerId);
      data.append("headline", popupFormData.headline);
      data.append("type", popupFormData.type);
      data.append("displayDelay", popupFormData.displayDelay);
      data.append("description", popupFormData.description);

      if (imageFile) {
        data.append("imageUrl", imageFile);
      } else {
        data.append("imageUrl", uploadedImageUrl);
      }

      const action = currentEditedId
        ? updatePopup({ id: currentEditedId, formData: data })
        : createPopup(data);

      dispatch(action).then((res) => {
        if (res.payload?.success) {
          toast.success(currentEditedId ? "Popup Updated" : "Popup Initialized");
          dispatch(getAllPopups()); // Refresh list
          resetForm();
        }
      });
    }
  };

  const handleRefresh = () => {
    isSliderPath ? dispatch(getSliders()) : dispatch(getAllPopups());
    toast.info("Data Refreshed");
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#09090b] text-white min-h-screen font-mono">
      <header className="flex justify-between border-b border-zinc-800 pb-4 items-center">
        <h1 className="text-2xl font-black uppercase tracking-tighter italic">
          {isSliderPath ? "Slider_Engine" : "Popup_Core"}
        </h1>
        <button onClick={handleRefresh} className="hover:rotate-180 transition-transform duration-500">
          <RefreshCw size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM SECTION */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-4 border-zinc-800 p-4 bg-zinc-900/50">
            <ProductImageUpload
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
            />
            <div className="mt-4">
              <CommonForm
                formControls={isSliderPath ? sliderFormControls : popupFormControls}
                formData={isSliderPath ? sliderFormData : popupFormData}
                setFormData={isSliderPath ? setSliderFormData : setPopupFormData}
                onSubmit={handleSubmit}
                buttonText={currentEditedId ? "SYNC_CHANGES" : "DEPLOY_LIVE"}
                isBtnDisabled={isLoading || imageLoadingState}
              />
              {currentEditedId && (
                <button 
                  onClick={resetForm}
                  className="w-full mt-2 text-[10px] uppercase underline text-zinc-500 hover:text-white"
                >
                  Discard_Changes
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MONITORING LIST SECTION */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-2">Live_Activity_Feed</div>
          {isSliderPath ? (
            sliders.map((s) => (
              <AdminSliderCard
                key={s._id}
                slider={s}
                onEdit={handleEditInitiate}
                onDelete={(id) => dispatch(deleteSlider(id)).then(() => toast.error("Node_Terminated"))}
                // FIX: Added onToggle to prevent TypeError
                onToggle={(id) => dispatch(toggleSliderStatus(id)).then(() => toast.success("Status_Toggled"))}
              />
            ))
          ) : (
            popups.map((p) => (
              <AdminPopupMonitor
                key={p._id}
                activePopup={p}
                onEdit={() => handleEditInitiate(p)}
                onDelete={(id) => dispatch(deletePopup(id)).then(() => toast.error("Popup_Removed"))}
                onToggle={(id) => dispatch(togglePopupActive(id)).then(() => toast.success("Popup_Toggled"))}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDesignManager;