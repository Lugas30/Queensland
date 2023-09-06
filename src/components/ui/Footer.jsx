import React from 'react'

export const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-100 text-base-content rounded">
      <div className="grid grid-flow-col gap-10">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <div className="">
          <img src="/src/assets/images/Icon-QSL.png"
            width={50}
            height={50}
            alt="Icon Queensland"
          />
        </div>
      </div>
      <div>
        <p className="text-xs">Copyright © 2023 - Queensland.id</p>
      </div>
    </footer>
  )
}
