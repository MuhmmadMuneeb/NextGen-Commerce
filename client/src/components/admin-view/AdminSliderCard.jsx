import React from "react";
import { Edit3, Trash2, ExternalLink, Power, PowerOff } from "lucide-react";

const AdminSliderCard = ({ slider, onEdit, onDelete, onToggle }) => {
  return (
    <div className={`group flex items-center gap-4 border-2 p-3 bg-black transition-all duration-300 ${
      slider.isActive ? "border-zinc-800 hover:border-emerald-500" : "border-red-900/30 opacity-60 hover:opacity-100"
    }`}>
      
      {/* Visual Preview */}
      <div className="relative h-16 w-28 border border-zinc-700 bg-zinc-900 overflow-hidden shrink-0">
        <img 
          src={slider.image} 
          className={`h-full w-full object-cover transition-all duration-500 ${
            slider.isActive ? "grayscale-0" : "grayscale"
          }`} 
          alt="node-preview" 
        />
        <div className={`absolute top-0 left-0 text-black text-[8px] font-black px-1 border-r border-b border-black ${
          slider.isActive ? "bg-emerald-500" : "bg-zinc-500"
        }`}>
          P_{slider.priority}
        </div>
      </div>
      
      {/* Metadata */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-black truncate uppercase tracking-tighter text-zinc-200">
            {slider.title || "UNTITLED_NODE"}
          </h4>
          <span className={`h-1.5 w-1.5 rounded-full ${slider.isActive ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <ExternalLink size={10} className="text-zinc-600" />
          <p className="text-[9px] text-zinc-500 truncate italic">
            {slider.linkUrl || "root/no_path"}
          </p>
        </div>
      </div>

      {/* Control Interlock */}
      <div className="flex gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
        {/* Toggle Status Button */}
        <button 
          onClick={() => onToggle(slider._id)} 
          className={`p-2 border border-zinc-800 transition-colors ${
            slider.isActive 
              ? "text-emerald-500 hover:bg-emerald-500 hover:text-black" 
              : "text-zinc-500 hover:bg-zinc-100 hover:text-black"
          }`}
          title={slider.isActive ? "Deactivate Node" : "Activate Node"}
        >
          {slider.isActive ? <Power size={14} /> : <PowerOff size={14} />}
        </button>

        {/* Edit Button */}
        <button 
          onClick={() => onEdit(slider)} 
          className="p-2 border border-zinc-800 bg-zinc-900 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
          title="Edit Node"
        >
          <Edit3 size={14} />
        </button>

        {/* Delete Button */}
        <button 
          onClick={() => onDelete(slider._id)} 
          className="p-2 border border-zinc-800 bg-zinc-900 text-red-500 hover:bg-red-600 hover:text-white transition-colors"
          title="Terminate Node"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default AdminSliderCard;