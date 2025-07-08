import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/layout/footer/Footer";
import MiniFooter from "../../components/layout/footer/MiniFooter";
import Header from "../../components/layout/header/Header";
import Wrapper from "../../components/layout/Wrapper";

const Layout = () => {
  const location = useLocation();

  const isDbtiPage = location.pathname.startsWith('/dbti');
  const noFooterPaths = ["/chatting", "/calendar"];
  const hideFooter = noFooterPaths.includes(location.pathname);

  return (
    <div>
      <Header isLoggedIn={true} />
      <Wrapper>
        <Outlet />
      </Wrapper>
      {isDbtiPage ? <MiniFooter /> : (!hideFooter && <Footer />)}
    </div>
  );
};

export default Layout;
