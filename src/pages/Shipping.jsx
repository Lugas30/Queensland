import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Layout } from "../layout/Layout";

export const Shipping = () => {
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [courier, setCourier] = useState("");
  const [service, setService] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [voucherInput, setVoucherInput] = useState(""); // State untuk menyimpan kode voucher yang dimasukkan oleh pengguna
  const [voucherError, setVoucherError] = useState(""); // State untuk menangani pesan kesalahan voucher

  const shippingCost = 25000;

  useEffect(() => {
    axios
      .get("http://localhost:5000/vouchers")
      .then((res) => {
        setVouchers(res.data.vouchers);
      })
      .catch((error) => {
        console.error("Error fetching voucher data:", error);
      });
  }, []);

  const checkVoucherValidity = () => {
  axios
    .get("http://localhost:5000/vouchers")
    .then((res) => {
      console.log("Response data:", res.data); // Log the response data
      const foundVoucher = res.data.find(
        (voucher) => voucher.code === voucherInput
      );
      if (foundVoucher) {
        applyVoucher(foundVoucher);
        setVoucherError("");
      } else {
        setVoucherError("Invalid voucher code");
      }
    })
    .catch((error) => {
      console.error("Error fetching voucher data:", error);
    });
};


  const applyVoucher = (voucher) => {
    switch (voucher.type) {
      case "total-price":
        setDiscount(voucher.amount);
        break;
      case "shipping":
        setShippingCost(shippingCost - voucher.amount);
        break;
      case "selected-item":
        const discountedProduct = cartItems.find(
          (item) => item.product.prod_name === voucher.targetProduct
        );
        if (discountedProduct) {
          discountedProduct.total_price -= voucher.amount;
          setCartItems([...cartItems]);
        }
        break;
      default:
        console.log("Voucher tidak valid");
        break;
    }
  };

  useEffect(() => {
    // Get shipping data from cookies
    const savedShippingData = Cookies.get("shippingData");

    if (savedShippingData) {
      const parsedShippingData = JSON.parse(savedShippingData);
      setFullName(parsedShippingData.fullName);
      setAddress(parsedShippingData.address);
      setProvince(parsedShippingData.province);
      setCity(parsedShippingData.city);
      setDistrict(parsedShippingData.district);
      setZipCode(parsedShippingData.zipCode);
      setPhone(parsedShippingData.phone);
      setCourier(parsedShippingData.courier);
      setService(parsedShippingData.service);
    }

    axios
      .get("http://localhost:5000/keranjangs")
      .then((res) => {
        setCartItems(res.data); // Use setCartItems to update the state
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shippingData = {
      fullName,
      address,
      province,
      city,
      district,
      zipCode,
      phone,
      courier,
      service,
      shippingCost,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/shipping",
        shippingData
      );
      console.log("Response from API:", response.data);
      // Lakukan tindakan lanjutan setelah pengiriman berhasil, misalnya navigasi atau tampilan notifikasi
      // Save shipping data to cookies
      Cookies.set("shippingData", JSON.stringify(shippingData));
    } catch (error) {
      console.error("Error sending data to API:", error);
      // Handle error, tampilkan notifikasi atau pesan kepada pengguna
    }
  };

  function calculateSubtotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.total_price, 0);
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal(cartItems);
    const total = subtotal + shippingCost - discount;
    return total;
  };

  return (
    <Layout>
      <div className="mx-32">
        <h1 className="text-3xl font-bold">Shipping</h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Bilah kiti */}
          <form onSubmit={handleSubmit} className="">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input input-bordered w-full my-3"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input input-bordered w-full my-3"
            />
            <div className="columns-2 flex gap-5">
              <select
                className="select select-bordered w-full max-w-xs my-3"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option disabled value="">
                  Province
                </option>
                <option>Jawa Tengah</option>
                <option>Jawa Barat</option>
                <option>Jawa Timur</option>
              </select>
              <select
                className="select select-bordered w-full max-w-xs my-3"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option disabled value="">
                  City
                </option>
                <option>Jakarta</option>
                <option>Bogor</option>
                <option>Depok</option>
                <option>Tanggerang</option>
              </select>
            </div>
            <div className="columns-2 flex gap-5">
              <select
                className="select select-bordered w-full max-w-xs my-3"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option disabled value="">
                  District
                </option>
                <option>Kec. A</option>
                <option>Kec. B</option>
                <option>Kec. C</option>
              </select>
              <input
                type="text"
                placeholder="ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="input input-bordered w-full max-w-xs my-3"
              />
            </div>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full my-3"
            />
            <div className="columns-2 flex my-3 gap-5">
              <select
                className="select select-bordered w-full max-w-xs"
                value={courier}
                onChange={(e) => setCourier(e.target.value)}
              >
                <option disabled value="">
                  Courier
                </option>
                <option>JNE</option>
                <option>SiCepat</option>
              </select>
              <select
                className="select select-bordered w-full max-w-xs"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option disabled value="">
                  Service
                </option>
                <option>Reguler</option>
                <option>Kilat</option>
              </select>
            </div>
            <div className="">
              <button
                type="submit"
                className="btn btn-xs btn-ghost normal-case mt-3"
              >
                Save address
              </button>
            </div>
          </form>

          <div>
            <div>
              <h3 className="text-xl font-bold">Your items</h3>
              <table className="table">
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-none">
                      <td>
                        <span className="block">{item.product.prod_name}</span>
                        <span className="block">
                          {item.product.selectedSize} -{" "}
                          {item.product.selectedColor} - {item.product.article}
                        </span>
                        <span className="block">Qty : {item.qty}</span>
                      </td>
                      <td className="text-right">IDR {item.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Voucher code */}
            <hr></hr>
            <div className="flex mx-3">
              <input
                type="text"
                placeholder="Add voucher code"
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
                className="input input-bordered input-sm w-full my-3 border-none"
              />
              <button
                className="btn btn-sm normal-case my-3 ml-2"
                onClick={checkVoucherValidity}
              >
                +
              </button>
            </div>
            {voucherError && <p className="text-red-500">{voucherError}</p>}

            <div className="pt-5">
              <h3 className="text-xl font-bold">Order summary</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <tbody className="">
                    <tr className="border-none">
                      <td>Subtotal</td>
                      <td className="text-right">
                        IDR {calculateSubtotal(cartItems)}
                      </td>
                    </tr>
                    <tr className="border-none">
                      <td>Shipping</td>
                      <td className="text-right">IDR {shippingCost}</td>
                    </tr>
                    <tr className="border-gray-700">
                      <td>Discount</td>
                      <td className="text-right">IDR {discount}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td className="text-right">IDR {calculateTotal()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary normal-case w-60"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
