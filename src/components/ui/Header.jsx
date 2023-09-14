import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const Header = () => {
  const [categories, setCategories] = useState([]);
  const [cartData, setCartData] = useState([]);

  // add kholis
      const navigate = useNavigate(); 
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`api/logout`).then(res => {
            if (res.data.status === 200) 
            {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                //swal("Success",res.data.message,"success");
                toast.success("Anda berhasil logout akun!");
                navigate('/');
            } 
        });
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
              <button className="btn btn-ghost normal-case">
                <div className="indicator">
                  <span>Sign in</span>
                </div>
              </button>
        );
    } else {
        AuthButtons = (

            <button type="button" onClick={logoutSubmit} className="btn btn-ghost normal-case">
              <div className="indicator">
                <span>Logout</span>
              </div>
            </button>

        );
    }
  // end

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });

    // Fetch cart data only once when the component mounts
    axios
      .get("http://localhost:5000/keranjangs")
      .then((res) => {
        setCartData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  function calculateTotalQty(cartData) {
    return cartData.reduce((totalQty, item) => totalQty + item.qty, 0);
  }

  function calculateSubtotal(cartData) {
    return cartData.reduce((total, item) => total + item.total_price, 0);
  }

  return (
    <nav className="navbar py-2 bg-base-100">
      {/* Navbar start */}
      <div className="navbar-start">
        {/* Menu desktop */}
        <div className="z-50">
          <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
          <div className="">
            {/* Page content here */}
            <label
              htmlFor="menu-drawer"
              className="btn btn-ghost normal-case drawer-button"
            >
              Menu
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="menu-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
              {/* Sidebar content here */}

              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/shop/${category.id}`}>{category.name}</Link>
                </li>
              ))}

              {/* <li>
                <a>New in</a>
              </li>
              <li>
                <Link to="/shop">Hijab</Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Search */}
        <button className="btn btn-ghost normal-case">
          <div className="indicator">
            <span>Search</span>
          </div>
        </button>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center">
        <a className="btn btn-link normal-case text-xl" href="/">
          <img
            src="/src/assets/images/Logo-QSL.png"
            width={180}
            height={65}
            alt="Queensland logo"
          ></img>
        </a>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {/* Account */}
        <Link to={`/auth/Signin`}>
          {AuthButtons}
        </Link>

        {/* Cart or Bags button */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost normal-case">
            <div className="indicator">
              <span>Bags ({calculateTotalQty(cartData)})</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow"
          >
            <div className="card-body">
              {cartData.map((item) => (
                <div key={item.id} className="flex items-center mt-3">
                  <img
                    src={item.product.gambar.img1}
                    alt={item.product.prod_name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="ml-3">
                    <p className="font-bold">{item.product.prod_name}</p>
                    <p>IDR {item.total_price}</p>
                    <p>Color: {item.product.selectedColor}</p>
                    <p>Size: {item.product.selectedSize}</p>
                    <p>Qty: {item.qty}</p>
                  </div>
                </div>
              ))}

              <span className="font-bold text-lg">
                {calculateTotalQty(cartData)} Items
              </span>
              <span className="text-info">
                Subtotal: IDR {calculateSubtotal(cartData)}
              </span>
              <div className="card-actions">
                <Link to={`/Cart`} className="btn-block">
                  <button className="btn btn-primary btn-block normal-case">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};
