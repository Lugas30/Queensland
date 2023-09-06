import React from "react";

const HeroSlider = () => {
  return (
    <div className="hero min-h-screen">
    {/* Desktop */}
    <img src="/src/assets/images/Hero.jpg" className="hidden md:block"></img>
    {/* Mobile */}
    <img src="/src/assets/images/Hero-mobile.jpg" className="block md:hidden"></img>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">REVIVE</h1>
          <button className="btn btn-outline radius-none normal-case">Discover the campaign</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
