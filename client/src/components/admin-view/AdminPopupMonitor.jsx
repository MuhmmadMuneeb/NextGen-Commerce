import React, { useState } from "react";
import { Globe, ShieldAlert, Clock, Edit3, Trash2, Power, PowerOff, ChevronDown, ChevronUp } from "lucide-react";

const AdminPopupMonitor = ({ activePopup, isAdminMode = true, onEdit, onDelete, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!activePopup) return (
    <div className="border-4 border-dashed border-zinc-800 p-8 text-center bg-zinc-900/20">
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic">
        No_Active_Popup_Signal
      </p>
    </div>
  );

  return (
    <div 
      className={`relative border-4 transition-all duration-500 cursor-pointer ${
        activePopup.isActive 
          ? "border-white bg-white text-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]" 
          : "border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600"
      } p-4 mb-4 overflow-hidden`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Globe size={16} className={`${activePopup.isActive ? "animate-spin-slow text-black" : "text-zinc-600"}`} />
          <div>
            <h4 className={`text-[11px] font-black uppercase tracking-tighter ${activePopup.isActive ? "text-black" : "text-white"}`}>
              {activePopup.headline || "NO_HEADLINE_STATED"}
            </h4>
            <p className="text-[8px] font-bold opacity-60 uppercase tracking-widest">ID: {activePopup.triggerId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`text-[9px] font-black px-2 py-0.5 border border-black/10 ${
            activePopup.isActive ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {activePopup.isActive ? 'LIVE_ON_AIR' : 'STANDBY'}
          </div>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {/* EXPANDED CONTENT SECTION */}
      <div className={`transition-all duration-500 ease-in-out ${
        isExpanded ? "max-h-[600px] mt-4 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="space-y-4 pt-4 border-t border-zinc-200/20">
          
          {/* IMAGE PREVIEW */}
          {activePopup.imageUrl && (
            <div className={`border-2 overflow-hidden h-40 ${activePopup.isActive ? "border-black bg-zinc-100" : "border-zinc-800 bg-zinc-900"}`}>
              <img 
                src={activePopup.imageUrl} 
                className={`w-full h-full object-cover ${!activePopup.isActive && "grayscale hover:grayscale-0 transition-all duration-700"}`} 
                alt="popup-visual" 
              />
            </div>
          )}
          
          {/* DESCRIPTION */}
          <div className={`p-3 border-l-2 ${activePopup.isActive ? "bg-black/5 border-black" : "bg-white/5 border-zinc-700"}`}>
            <p className="text-[10px] leading-relaxed font-medium">
              {activePopup.description || "No system description provided for this override."}
            </p>
          </div>
          
          {/* METADATA */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-[8px] font-black uppercase bg-zinc-800/10 p-2">
              <ShieldAlert size={12}/> <span>Type: {activePopup.type}</span>
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black uppercase bg-zinc-800/10 p-2">
              <Clock size={12}/> <span>Delay: {activePopup.displayDelay}ms</span>
            </div>
          </div>
        </div>

        {/* ACTION CONTROLS */}
        {isAdminMode && (
          <div className="flex justify-end gap-2 mt-6" onClick={(e) => e.stopPropagation()}>
            {/* TOGGLE BUTTON */}
            <button 
              onClick={() => onToggle(activePopup._id)}
              className={`flex items-center gap-2 px-3 py-2 text-[9px] font-black uppercase border-2 transition-all ${
                activePopup.isActive 
                  ? "bg-black text-emerald-500 border-black hover:bg-emerald-500 hover:text-black" 
                  : "bg-emerald-500 text-black border-emerald-500 hover:bg-black hover:text-emerald-500"
              }`}
            >
              {activePopup.isActive ? <PowerOff size={12} /> : <Power size={12} />}
              {activePopup.isActive ? "Deactivate" : "Go_Live"}
            </button>
            
            {/* EDIT BUTTON */}
            <button 
              onClick={() => onEdit(activePopup)}
              className={`flex items-center gap-2 px-3 py-2 text-[9px] font-black uppercase border-2 transition-all ${
                activePopup.isActive 
                  ? "border-black bg-zinc-200 text-black hover:bg-black hover:text-white"
                  : "border-zinc-700 bg-zinc-900 text-white hover:bg-white hover:text-black"
              }`}
            >
              <Edit3 size={12} /> Edit
            </button>

            {/* DELETE BUTTON */}
            <button 
              onClick={() => onDelete(activePopup._id)}
              className="flex items-center gap-2 px-3 py-2 text-[9px] font-black uppercase border-2 border-red-600 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all"
            >
              <Trash2 size={12} /> Terminate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPopupMonitor;