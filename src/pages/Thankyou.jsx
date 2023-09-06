import React from "react";
import { Layout } from "../layout/Layout";

export const Thankyou = () => {
  return (
    <Layout>
      <div className="mx-10">
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body items-center">
            <img src="/src/assets/images/gift-box.png" width={100}></img>
            <h2 className="card-title">Thankyou for shopping!</h2>
            <h4 className="text-base font-bold">
              Your package will delivery soon
            </h4>
            <p>Order ID :</p>
            <p>#QS24062023 - 12346</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary normal-case">
                Continue shopping
              </button>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary normal-case">
                See History
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
