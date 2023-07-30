import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const PageContainer = (props) => {
  return (
    <>
      <Header isHidden={props.isHidden} />
      {props.children}
      <Footer />
    </>
  );
};

export default PageContainer;
