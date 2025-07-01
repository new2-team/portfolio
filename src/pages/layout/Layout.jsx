
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
};

export default Layout;
