import React from "react";
import { Footer } from "../components/ui/Footer";
import { Header } from "../components/ui/Header";

export const Layout = ({ children }) => {
  return (

    <React.Fragment>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </React.Fragment>
  );
};
