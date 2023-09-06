import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify for displaying toasts
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useNavigate } from "react-router-dom";

export const ProductViewDetail = ({ productDetail }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/keranjangs");
      // You might want to do something with the fetched cart items, but
      // in this example, we won't store them in a state variable.
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
  };

  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleAddToCart = async () => {
    if (selectedColor && selectedSize) {
      const selectedItem = {
        ...productDetail,
        selectedColor,
        selectedSize,
      };

      const productItem = {
        qty: 1,
        total_price:
          productDetail.harga_disc !== 0
            ? productDetail.harga_disc
            : productDetail.harga,
        product: selectedItem,
      };

      try {
        setIsAddingToCart(true);

        const response = await axios.get("http://localhost:5000/keranjangs");

        const existingItem = response.data.find(
          (item) =>
            item.product.selectedColor === selectedColor &&
            item.product.selectedSize === selectedSize &&
            item.product.id === productDetail.id
        );

        if (existingItem) {
          existingItem.qty += 1;
          existingItem.total_price += productItem.total_price;

          await axios.put(
            `http://localhost:5000/keranjangs/${existingItem.id}`,
            existingItem
          );
        } else {
          await axios.post("http://localhost:5000/keranjangs", productItem);
        }
        toast.success("Product added to cart!");
        // navigate('/shop')
      } catch (error) {
        toast.error("Failed to add product to cart.");
      } finally {
        setIsAddingToCart(false);
      }
    } else {
      toast.warning("Please select color and size before adding to cart.");
    }
  };

  return (
    <div className="mx-4">
      <h3 className="text-2xl font-bold uppercase">
        {productDetail.prod_name}
      </h3>
      {productDetail.harga_disc !== 0 ? (
        <>
          <span className="opacity-30 line-through pr-2 text-xl">
            IDR {productDetail.harga}
          </span>
          <span className="text-xl">IDR {productDetail.harga_disc}</span>
        </>
      ) : (
        <span className="no-discount text-xl">IDR {productDetail.harga}</span>
      )}

      <div>
        {/* Pilihan color */}
        <div>
          <h4>Color:</h4>
          {productDetail.colors &&
            productDetail.colors.map((color) => (
              <label key={color.id}>
                <input
                  type="radio"
                  name="color"
                  value={color.color_name}
                  checked={selectedColor === color.color_name}
                  onChange={() => handleColorChange(color.color_name)}
                />
                {color.color_name}
              </label>
            ))}
        </div>
      </div>

      <div>
        {/* Pilihan size */}
        <div>
          <h4>Size:</h4>
          {productDetail.sizes &&
            productDetail.sizes.map((size) => (
              <label key={size.id}>
                <input
                  type="radio"
                  name="size"
                  value={size.size_name}
                  checked={selectedSize === size.size_name}
                  onChange={() => handleSizeChange(size.size_name)}
                />
                {size.size_name}
              </label>
            ))}
        </div>
      </div>

      {/* -----------Logic section------------- */}
      <div>
        {/* Button Add to Cart */}
        <div>
          <button
            className="btn btn-outline btn-block radius-none normal-case justify-center"
            onClick={handleAddToCart}
            disabled={isAddingToCart} // Disable the button if the process is ongoing
          >
            {isAddingToCart ? "Adding..." : "Add to Bag"}
          </button>
        </div>
        {/* Button Add to Whistlist */}
        <div>
          <button className="btn btn-block btn-link normal-case justify-center">
            Add to Whistlist
          </button>
        </div>
      </div>
      {/* -----------End Logic section------------- */}

      <div>
        {/* Deskripsi produk */}
        <p>{productDetail.description}</p>
      </div>
      <div>
        {/* Deskripsi produk */}
        <p>{productDetail.size_chart}</p>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar 
      />
    </div>
  );
};
