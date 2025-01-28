import Header from "./components/Header";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./components/Product";
import products from "./product";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xlg={3}>
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
