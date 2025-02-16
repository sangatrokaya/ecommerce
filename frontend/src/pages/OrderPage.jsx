import { ListGroup, Row, Col, Card, Image } from "react-bootstrap";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/orderSlice";

function OrderPage() {
  let { id } = useParams();
  let { data: order, isLoading, error } = useGetOrderByIdQuery(id);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <Messsage variant="danger">{error?.data?.error}</Messsage>
  ) : (
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
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "15px",
              }}
            >
              Shipping
            </h3>
            <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>
              <strong>Name: </strong>
              {order.shippingAddress.recipient} | {order.shippingAddress.phone}
              <br />
              <strong>Address: </strong>
              {order.shippingAddress.address} | {order.shippingAddress.city}
            </p>
            {order.isDelivered ? (
              <Message>Deliverd at {order.deliveredAt}</Message>
            ) : (
              <Message variant="danger">Not Delivered!</Message>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      {/* <Col md={4}>
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
      </Col> */}
    </Row>
  );
}

export default OrderPage;
