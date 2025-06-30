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
};

export default Layout;