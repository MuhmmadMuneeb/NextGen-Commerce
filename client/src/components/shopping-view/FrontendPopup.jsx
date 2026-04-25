import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, Tag, Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import { getLivePopup, clearActivePopupUI } from "@/store/popup-slice";

const FrontendPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activePopup } = useSelector((state) => state.popup);

  const [isVisible, setIsVisible] = useState(false);

  // 🔥 FETCH POPUP ON LOAD
  useEffect(() => {
    dispatch(getLivePopup());
  }, [dispatch]);

  // 🔥 HANDLE DISPLAY LOGIC
  useEffect(() => {
    if (activePopup && activePopup.isActive) {
      const sessionKey = `popup_dismissed_${activePopup._id}`;

      // Prevent showing again in same session
      if (sessionStorage.getItem(sessionKey)) return;

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, activePopup.displayDelay || 2000);

      return () => clearTimeout(timer);
    }
  }, [activePopup]);

  // 🔥 CLOSE POPUP
  const handleClose = () => {
    setIsVisible(false);

    if (activePopup) {
      sessionStorage.setItem(`popup_dismissed_${activePopup._id}`, "true");
    }

    dispatch(clearActivePopupUI());
  };

  // 🔥 BUTTON CLICK
  const handleActionClick = () => {
    handleClose();

    if (activePopup?.targetUrl) {
      navigate(activePopup.targetUrl);
    }
  };

  if (!isVisible || !activePopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-3xl bg-white border-4 border-black flex flex-col md:flex-row overflow-hidden">

        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 z-10 p-3 bg-black text-white"
        >
          <X size={20} />
        </button>

        {/* IMAGE */}
        {activePopup.imageUrl && (
          <div className="w-full md:w-2/5 h-48 md:h-auto bg-zinc-100 overflow-hidden">
            <img
              src={activePopup.imageUrl}
              alt="popup"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="p-8 flex flex-col justify-center w-full">
          <h2 className="text-3xl font-black mb-4">
            {activePopup.headline}
          </h2>

          <p className="text-sm mb-6">
            {activePopup.description}
          </p>

          <div className="flex gap-4">
            <Button onClick={handleActionClick}>
              Action <ArrowRight size={16} />
            </Button>

            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendPopup;