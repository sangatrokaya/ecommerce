import { useState } from "react";
import { Row, Col, ListGroup, Form, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa6";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
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
                <strong>{item.name}</strong>
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
                  onChange={(e) => changeCartQty(item, Number(e.target.value))}
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
    </>
  );
};

export default CartPage;
