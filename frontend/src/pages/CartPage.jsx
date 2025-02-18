import { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Message from "../components/Message";

const CartPage = () => {
  const { cartItems, shippingCharge, totalPrice, itemPrice } = useSelector(
    (state) => state.cart
  );
  // const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const changeCartQty = (item, qty) => {
    // setQty(qty);
    dispatch(addItem({ ...item, qty }));
  };
  const removeCartItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      {cartItems?.length == 0 ? (
        <Message variant="info">
          <strong>Your Cart is Empty!</strong>
          <p>You might be looking for some cool gadgets!</p>
          <Link
            to="/"
            style={{
              color: "green",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            Click Here!
          </Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        fluid
                        rounded
                        alt="product image in cart"
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={2}>
                      {" "}
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </Col>
                    <Col md={2}>
                      {" "}
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          changeCartQty(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeCartItem(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <h4>
                      Total (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      Products
                    </h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>${itemPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping Charge</Col>
                      <Col>${shippingCharge}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Grand Total</strong>
                      </Col>
                      <Col>
                        <strong>${totalPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link
                      to="/signin?redirect=/shipping"
                      className="btn btn-sm btn-success"
                    >
                      Checkout
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartPage;
