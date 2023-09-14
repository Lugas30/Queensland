import React from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      phone: registerInput.phone,
      password: registerInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          toast.success("Anda berhasil mendaftar!");
          // navigate("/");
          // Seharusnya diarahkan ke halaman terakhir dibuka!
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card card-side rounded-none bg-base-100 shadow-xl max-w-3xl items-center">
        <figure className="w-1/2">
          <img src="/src/assets/images/auth-pic.jpg" alt="Movie" />
        </figure>
        <form className="card-body w-3/6" onSubmit={registerSubmit}>
          <h2 className="text-3xl font-bold mb-8">Create your account</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput} 
            value={registerInput.email}
            className="input input-bordered rounded-none w-full max-w-xs mb-5"
          />
          <input
            type="text"
            name="name"
            placeholder="Full name"
            onChange={handleInput}
            value={registerInput.name}
            className="input input-bordered rounded-none w-full max-w-xs mb-5"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            onChange={handleInput}
            value={registerInput.phone}
            className="input input-bordered rounded-none w-full max-w-xs mb-5"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            value={registerInput.password}
            className="input input-bordered rounded-none w-full max-w-xs mb-5"
          />

          <div className="card-actions justify-center" type="submit">
            <button type="submit" className="btn btn-primary w-full mb-3 normal-case">
              Register
            </button>
          </div>

          <div className="text-center text-xs">
            <p>
              Already have an account?{" "}
              <Link to="/auth/Signin" className="font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};
