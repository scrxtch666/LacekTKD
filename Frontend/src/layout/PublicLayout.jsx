import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";
import ScrollToTop from "../Components/ScrollToTop";

function PublicLayout() {
  return (
    <>
      <Header />
      <Container>
        <ScrollToTop />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default PublicLayout;
