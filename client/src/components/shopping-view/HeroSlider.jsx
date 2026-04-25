import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSliders } from "@/store/slider-slice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sliders } = useSelector((state) => state.slider);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch Sliders
  useEffect(() => {
    dispatch(getSliders());
  }, [dispatch]);

  // Reset index if new data arrives
  useEffect(() => {
    if (sliders.length > 0) setCurrentSlide(0);
  }, [sliders]);

  // Auto-play Logic
  useEffect(() => {
    if (sliders.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sliders, currentSlide]);

  if (sliders.length === 0) {
    return (
      <div className="h-[70vh] md:h-[85vh] bg-zinc-100 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-widest">Fetching_Visual_System...</span>
      </div>
    );
  }

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-zinc-100">
      <div className="relative h-full w-full">
        {/* IMAGE */}
        <img
          key={sliders[currentSlide]?._id}
          src={sliders[currentSlide]?.image} 
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          alt="featured-banner"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-20 left-6 md:left-16 text-white max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">
            {sliders[currentSlide]?.title}
          </h1>
          <p className="text-sm md:text-lg font-medium opacity-90 mb-8 max-w-md tracking-tight">
            {sliders[currentSlide]?.subtitle}
          </p>
          <Button
            onClick={() => navigate(sliders[currentSlide]?.linkUrl || "/shop/listing")}
            className="bg-white text-black hover:bg-zinc-200 rounded-none px-10 py-6 font-black uppercase text-xs tracking-widest transition-transform hover:scale-105 cursor-pointer"
          >
            Access Collection
          </Button>
        </div>

        {/* MANUAL CONTROLS */}
        <div className="absolute bottom-10 right-6 md:right-16 flex gap-1">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length)}
            className="p-4 bg-black text-white hover:bg-white hover:text-black border border-black transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % sliders.length)}
            className="p-4 bg-black text-white hover:bg-white hover:text-black border border-black transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* PROGRESS DOTS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
          {sliders.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 transition-all duration-500 cursor-pointer ${
                i === currentSlide ? "w-12 bg-white" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;