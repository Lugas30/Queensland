import React from "react";

export const ProductViewCta = () => {
  return (
    <>
      <div className="border-t-2">
        <h3 className="text-2xl text-center font-bold py-10">
          You may also like
        </h3>
        <div className="grid grid-cols-4 gap-2 px-2">
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
    </>
  );
};
