import React from 'react'

export const ForgotPass = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card card-side rounded-none bg-base-100 shadow-xl max-w-3xl items-center">
        <figure className="w-1/2">
          <img src="/src/assets/images/auth-pic.jpg" alt="Movie" />
        </figure>
        <div className="card-body w-3/6">
          <h2 className="text-3xl font-bold mb-8">Forgot password</h2>
          <p className="mb-8 text-sm">Enter your e-mail address and we will send you an e-mail telling you how to recover it.</p>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered rounded-none w-full max-w-xs mb-8"
          />

          <div className="card-actions justify-center" type="submit">
            <button className="btn btn-primary w-full mb-5 normal-case">Retrive Password</button>
          </div>

          
        </div>
      </div>
    </div>
  )
}
