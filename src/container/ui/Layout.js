import React, { Fragment, useEffect } from "react";
import Navigation from "../nav/Navigation";

const Layout = (props) => {
  //   useEffect(() => {
  //     document.title = title;
  //   }, []);

  return (
    <Fragment>
      <Navigation />
      <main>
        <div>{props.children}</div>
      </main>
    </Fragment>
  );
};

export default Layout;
