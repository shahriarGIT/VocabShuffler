import React, { Fragment, useEffect } from "react";
import Navigation from "../nav/Navigation";

const Layout = (props) => {
  //   useEffect(() => {
  //     document.title = title;
  //   }, []);

  return (
    <Fragment>
      <Navigation
        hideMenu={props.hideMenu}
        showMenu={props.showMenu}
        menuStatus={props.menuStatus}
      />
      <main onClick={props.hideMenu}>
        <div>{props.children}</div>
      </main>
    </Fragment>
  );
};

export default Layout;
