import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-transparent rounded-none">
      {/* 01. FILTER HEADER */}
      <div className="pb-6 mb-6 border-b border-black">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter transform -skew-x-12 leading-none">
          SYSTEM<span className="text-black/20">/</span>CONFIG
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 mt-2">
          Adjust_Parameters.exe
        </p>
      </div>

      {/* 02. FILTER CATEGORIES */}
      <div className="space-y-10">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="group">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-4 bg-black" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-black">
                  {keyItem} // _INDEX
                </h3>
              </div>

              <div className="grid gap-3 mt-4">
                {filterOptions[keyItem].map((option) => {
                  const isActive =
                    filters &&
                    filters[keyItem] &&
                    filters[keyItem].indexOf(option.id) > -1;

                  return (
                    <div
                      key={option.id}
                      className={`
                        flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border
                        ${isActive 
                          ? "bg-black text-white border-black" 
                          : "bg-white text-black/60 border-black/5 hover:border-black hover:text-black"}
                        rounded-none
                      `}
                      // Use a div with onClick instead of Label for better event control
                      onClick={() => handleFilter(keyItem, option.id)}
                    >
                      <div className="relative flex items-center justify-center">
                        <Checkbox
                          className={`
                            h-4 w-4 rounded-none border-2 transition-all pointer-events-none
                            ${isActive ? "border-white bg-white text-black" : "border-black/20 bg-transparent"}
                          `}
                          checked={isActive}
                        />
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-widest pointer-events-none">
                        {option.label}
                      </span>
                      
                      {isActive && (
                        <span className="ml-auto text-[8px] animate-pulse">● ACTIVE</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      {/* 03. FOOTER MARKER */}
      <div className="mt-12 pt-6 border-t border-black/5">
        <div className="flex justify-between items-center opacity-20">
          <span className="text-[8px] font-bold tracking-[0.5em]">SECURE_CONNECTION</span>
          <div className="h-[1px] w-12 bg-black" />
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;