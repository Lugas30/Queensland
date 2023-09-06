import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import { Layout } from "../layout/Layout";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerNote, setCustomerNote] = useState("");

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/keranjangs")
      .then((res) => {
        setCartItems(res.data); // Use setCartItems to update the state
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  // 
  // Buat ajah seller note ada dibawah keranjang !!!
  // 


  const sendCustomerNote = () => {
  // Lakukan permintaan HTTP POST ke API dengan catatan pelanggan
  axios
    .post("http://localhost:5000/customer-note", {
      customerNote: customerNote,
    })
    .then((res) => {
      // Catatan pelanggan berhasil dikirim, mungkin Anda ingin melakukan sesuatu
      console.log("Customer note sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending customer note:", error);
    });
};


  function calculateSubtotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.total_price, 0);
  }

  return (
    <Layout>
      <div className="mx-32">
        <h1 className="text-3xl font-bold">Shopping Bag</h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Bilah kiri */}
          <div className="">
            {cartItems.map((item, index) => (
              <table key={index} className="table-fixed my-5">
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={item.product.gambar.img1}
                        width={100}
                        alt={item.name}
                      />
                    </td>
                    <td className="px-5">
                      <h4 className="block font-bold">
                        {item.product.prod_name}
                      </h4>
                      <span className="block text-sm pt-1">
                        {item.product.selectedSize} -{" "}
                        {item.product.selectedColor} - {item.product.article}
                      </span>

                      {/* Harga menampilkan sesuai kondisi */}
                      {item.product.harga_disc !== 0 ? (
                        <>
                          <span className="opacity-30 line-through pr-2 text-sm pt-1">
                            IDR {item.product.harga}
                          </span>
                          <span className="text-sm pt-1">
                            IDR {item.product.harga_disc}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm pt-1">
                          Price : IDR {item.product.harga}
                        </span>
                      )}

                      <span className="block text-sm">Qty : {item.qty}</span>

                      <span className="block text-sm pt-1">
                        IDR {item.total_price}
                      </span>
                      <button
                        className="flex text-sm pt-3"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>

          {/* Bilah kanan */}
          <div>
            <div>
              <h3 className="text-xl font-bold">Note for seller</h3>
              <p>
                If you have a note for the seller, please enter it in the box
                below
              </p>
              <input
                type="text"
                placeholder="Note here"
                className="input input-bordered w-full max-w-xs"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
              />
            </div>
            <div className="pt-5">
              <h3 className="text-xl font-bold">Order summary</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td className="text-right">
                        IDR {calculateSubtotal(cartItems)}
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td className="text-right">Calculate on shipping</td>
                    </tr>
                    <tr className="border-gray-700">
                      <td>Discount</td>
                      <td className="text-right">IDR 0</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td className="text-right">
                        IDR {calculateSubtotal(cartItems)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full text-center mt-3">
              <Link to={`/Shipping`} className="btn-block">
                <button
                  className="btn btn-primary normal-case w-60"
                  onClick={sendCustomerNote}
                >
                  Go to shipping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
