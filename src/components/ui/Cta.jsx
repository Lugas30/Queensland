import React from "react";

const Cta = () => {
  return (
    <>
      {/* Top block */}
      <div className="p-6 border-b-2">
        <div className="grid grid-cols-4 gap-5">
          <div className="">
            <h3 className="text-3xl font-bold leading-loose">New In</h3>
            <p className="leading-loose">
              Discover the latest launches onsite our special collection{" "}
            </p>
            <a href="#" className="underline leading-loose">
              Shop New Arrival
            </a>
          </div>
          <div className="grid grid-cols-4 col-span-3 gap-5">
            <div className="bg-slate-100">
              <a className="" href="#">
                <img src="/src/assets/images/products/23A.jpg"></img>
              </a>
            </div>
            <div className="bg-slate-100">
              <a className="" href="#">
                <img src="/src/assets/images/products/23A.jpg"></img>
              </a>
            </div>
            <div className="bg-slate-100">
              <a className="" href="#">
                <img src="/src/assets/images/products/23A.jpg"></img>
              </a>
            </div>
            <div className="bg-slate-100">
              <a className="" href="#">
                <img src="/src/assets/images/products/23A.jpg"></img>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom block */}
      <div className="p-6 border-b-2">
        <div className="grid grid-cols-2 gap-7">

            <div>
                <img className="mb-5" src="/src/assets/images/cta1.jpg"></img>
                <div className="">
                    <span className="text-2xl font-bold">Abaya</span>
                    <a href="#" className="flex float-right text-right underline">Shop the Collection</a>
                </div>
            </div>

            <div>
                <img className="mb-5" src="/src/assets/images/cta2.jpg"></img>
                <div className="">
                    <span className="text-2xl font-bold">Chiffon Hijab</span>
                    <a href="#" className="flex float-right text-right underline">Shop the Collection</a>
                </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default Cta;
