import Header from "./components/Header";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Container className="my-3">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default App;
