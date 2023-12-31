import React from "react";
import Main from "./Main";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
