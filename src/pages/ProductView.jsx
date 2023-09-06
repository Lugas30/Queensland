import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductViewImg } from "../components/ui/ProductViewImg";
import { ProductViewDetail } from "../components/ui/ProductViewDetail";
import { ProductViewCta } from "../components/ui/ProductViewCta";
import { Layout } from "../layout/Layout";

export const ProductView = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    // Call the API and fetch the product detail based on the productId
    axios
      .get(`http://localhost:5000/products_detail/${productId}`)
      .then((response) => {
        setProductDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product detail:", error);
      });
  }, [productId]);

  return (
    <Layout>
      <div className="grid grid-flow-row-dense grid-cols-3 gap-2 mb-20">
        <div className="col-span-2">
          <ProductViewImg imgSrc={productDetail.gambar} />
        </div>
        <ProductViewDetail productDetail={productDetail} />
      </div>
      <ProductViewCta />
    </Layout>
  );
};
