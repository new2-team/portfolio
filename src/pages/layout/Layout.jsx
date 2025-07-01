<<<<<<< HEAD
import React from 'react';
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import {Outlet} from "react-router-dom";
import Wrapper from "../../components/layout/Wrapper";

const Layout = () => {
    return (
        <div>
            <Header  isLoggedIn={true} />
                <Wrapper>
                    <Outlet/>
                </Wrapper>
            <Footer />
        </div>
    );
=======

import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import Wrapper from "../../components/layout/Wrapper";

const Layout = () => {
  const location = useLocation();

  const noFooterPaths = ['/chatting', '/calendar'];

  return (
    <div>
      <Header isLoggedIn={true} />
      <Wrapper>
        <Outlet />
      </Wrapper>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
>>>>>>> calendar
};

export default Layout;
