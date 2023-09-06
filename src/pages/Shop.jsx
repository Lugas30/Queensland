import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Titlebar } from "../components/ui/Titlebar";
import { Filterbar } from "../components/ui/Filterbar";
import { ProductGrid } from "../components/ui/ProductGrid";

export const Shop = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    // Lakukan panggilan API untuk mengambil informasi kategori yang dipilih
    axios
      .get(`http://localhost:5000/categories/${categoryId}`)
      .then((res) => {
        setSelectedCategory(res.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [categoryId]);

  useEffect(() => {
    if (selectedCategory.name && selectedCategory.name !== "All items") {
      // Lakukan panggilan API untuk mengambil daftar produk dari kategori yang dipilih
      axios
        .get(
          `http://localhost:5000/products?category.name=${encodeURIComponent(
            selectedCategory.name
          )}`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      // Lakukan panggilan API untuk mengambil semua produk jika kategori adalah "All items"
      axios
        .get("http://localhost:5000/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [selectedCategory]);

  return (
    <Layout>
      <Titlebar title={selectedCategory.name} />
      <Filterbar />
      <ProductGrid products={products} />
    </Layout>
  );
};
