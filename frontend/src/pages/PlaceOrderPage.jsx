import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddOrderMutation } from "../slices/orderSlice";

function PlaceOrderPage() {
  const { cartItems, shippingAddress, itemPrice, shippingCharge, totalPrice } =
    useSelector((state) => state.cart);

  const [addOrder, { isLoading }] = useAddOrderMutation();
  const placeOrderHandler = async () => {
    try {
      let resp = await addOrder({
        orderItems: cartItems,
        shippingAddress,
        itemPrice,
        shippingCharge,
        totalPrice,
      }).unwrap();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <Row style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "15px",
              }}
            >
              Shipping
            </h2>
            <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>
              <strong>Name: </strong>
              {shippingAddress.recipient} | {shippingAddress.phone}
              <br />
              <strong>Address: </strong>
              {shippingAddress.address} | {shippingAddress.city}
            </p>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item._id}
                style={{ padding: "15px 5px", borderBottom: "1px solid #eee" }}
              >
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={item.image}
                      fluid
                      rounded
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </Col>
                  <Col>
                    <Link
                      to={`/product/${item._id}`}
                      style={{
                        fontSize: "18px",
                        color: "#333",
                        textDecoration: "none",
                      }}
                    >
                      <strong>{item.name}</strong>
                    </Link>
                  </Col>
                  <Col>
                    <strong style={{ fontSize: "16px", color: "#28a745" }}>
                      {item.qty} X {item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{
                backgroundColor: "black",
                color: "#fff",
                borderRadius: "8px 8px 0 0",
                padding: "15px",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
                Order Summary
              </h2>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ padding: "15px", fontSize: "16px", color: "#555" }}
            >
              <Row>
                <Col>Item</Col>
                <Col>${itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ padding: "15px", fontSize: "16px", color: "#555" }}
            >
              <Row>
                <Col>Shipping</Col>

                <Col>${shippingCharge}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ padding: "15px", fontSize: "16px", color: "#555" }}
            >
              {" "}
              <Row>
                <Col>Total</Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item style={{ padding: "15px" }}>
              <Button
                variant="dark"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "100%",
                }}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default PlaceOrderPage;
