import React, { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon, Scan, Cpu, Zap } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("image", imageFile);
      const response = await axios.post(
        "http://localhost:3000/api/admin/products/upload-image",
        data,
      );

      if (response?.data?.success) {
        setUploadedImageUrl(
          response.data.result.secure_url || response.data.result.url,
        );
      }
    } catch (error) {
      console.error(error.response?.data?.message || "ASSET_TRANSFER_FAILED");
      setUploadedImageUrl(null);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null && !uploadedImageUrl) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`mt-6 w-full font-mono ${isCustomStyling ? "" : "mx-auto max-w-md"}`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap size={14} className="text-emerald-500" />
        <Label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 cursor-help">
          Asset_Source_Path
        </Label>
      </div>
      
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative border-4 border-white bg-[#09090b] p-2 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] transition-all"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex h-48 cursor-crosshair flex-col items-center justify-center border-2 border-dashed border-zinc-800 bg-black transition-all hover:bg-zinc-900 hover:border-emerald-500 group"
          >
            <UploadCloudIcon className="mb-4 h-10 w-10 text-white group-hover:text-emerald-500 transition-colors" />
            <span className="text-xs font-black uppercase tracking-tighter text-white">
              {isEditMode ? "OVERWRITE_ASSET" : "INITIALIZE_UPLOAD"}
            </span>
            <span className="mt-2 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
              Drag_Drop or Click_To_Browse
            </span>
          </Label>
        ) : imageLoadingState ? (
          <div className="relative flex h-32 flex-col items-center justify-center border-2 border-white bg-black text-white overflow-hidden">
            {/* Scanning Animation */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_15px_#10b981] z-10"
            />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(16,185,129,0.05)_3px)] pointer-events-none" />
            <Scan className="mb-2 h-8 w-8 animate-pulse text-emerald-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 animate-pulse">
              Syncing_With_Cloud...
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between border-2 border-white bg-white px-4 py-4 text-black">
            <div className="flex items-center gap-3 overflow-hidden cursor-default">
              <div className="bg-black p-2 text-white border-2 border-black">
                <FileIcon size={20} strokeWidth={3} />
              </div>
              <p className="truncate text-xs font-black uppercase tracking-tighter italic cursor-text">
                {imageFile.name}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-none border-2 border-black hover:bg-red-600 hover:text-white transition-all cursor-pointer"
              onClick={handleRemoveImage}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Footer system text */}
      <div className="mt-4 flex items-center justify-between opacity-40">
        <div className="flex items-center gap-2">
            <Cpu size={12} className="text-emerald-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400">Protocol_v4.1</span>
        </div>
        <div className="flex gap-1">
           <div className="h-1.5 w-1.5 bg-emerald-500" />
           <div className="h-1.5 w-1.5 bg-zinc-800" />
           <div className="h-1.5 w-1.5 bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export default ProductImageUpload;