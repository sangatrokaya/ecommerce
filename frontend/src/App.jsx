import Header from "./components/Header";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./components/Product";
import products from "./product";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <>
      <Header />
      <Container className="my-3">
        {/* <ProductPage /> */}
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xlg={3} key={product.name}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default App;
