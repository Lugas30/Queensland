import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          toast.success("Success");
          navigate("/");
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
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
        <div className="card-body w-3/6">
          <h2 className="text-3xl font-bold mb-5">Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered rounded-none w-full max-w-xs mb-5"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered rounded-none w-full max-w-xs mb-5"
          />

          <div className="card-actions justify-center" type="submit">
            <button className="btn btn-primary w-full mb-5 normal-case">
              Sign in
            </button>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-outline w-full mb-8 normal-case">
              <img src="/src/assets/images/google.png" width={20}></img>Continue
              with Google
            </button>
          </div>
          <div className="text-center text-xs">
            <a href="#">Forgot password ?</a>
          </div>
          <div className="text-center text-xs">
            <p>
              Don’t have account?{" "}
              <a href="#" className="font-bold">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
