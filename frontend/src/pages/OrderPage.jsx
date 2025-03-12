import {
  ListGroup,
  Row,
  Col,
  Card,
  Image,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import { useParams, Link } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../slices/orderSlice";
import { orderStatusColor } from "../utils/OrderStatusColors";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

function OrderPage() {
  const [isEdit, setIsEdit] = useState(false);
  let { id } = useParams();
  let { data: order, isLoading, refetch, error } = useGetOrderByIdQuery(id);
  const [updateOrderStatus, { isLoading: updateLoading }] =
    useUpdateOrderStatusMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const updateOrderStatusHandler = async (id, status) => {
    try {
      let resp = await updateOrderStatus({ id, status }).unwrap();
      refetch();
      setIsEdit(false);
      toast.success(resp.message);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  return isLoading ? (
    <h1 style={{ textAlign: "center", marginTop: "50px", color: "#333" }}>
      Loading...
    </h1>
  ) : error ? (
    <Message variant="danger">{error?.data?.error}</Message>
  ) : (
    <Row
      style={{
        padding: "20px",
        background: "linear-gradient(to right, #f9f9f9, #eef1f5)",
      }}
    >
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "20px",
                borderBottom: "2px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Shipping Details
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
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
          <ListGroup.Item
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "20px",
                borderBottom: "2px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Payment Details
            </h3>
            <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
              <strong>Mode: </strong>COD
            </p>
            {order.isPaid ? (
              <Message>Paid ${order.totalPrice}</Message>
            ) : (
              <Message variant="danger">Not Paid!</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "20px",
                borderBottom: "2px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Order Items
            </h3>
            {order.orderItems.map((item) => (
              <ListGroup.Item
                key={item._id}
                style={{
                  padding: "15px 5px",
                  borderBottom: "1px solid #eee",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
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
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
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
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            border: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{
                backgroundColor: "black",
                color: "#fff",
                borderRadius: "12px 12px 0 0",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <h2 style={{ fontSize: "26px", fontWeight: "bold", margin: "0" }}>
                Order Summary
              </h2>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ padding: "20px", fontSize: "16px", color: "#555" }}
            >
              <Row>
                <Col>Item</Col>
                <Col>${order.itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              style={{ padding: "20px", fontSize: "16px", color: "#555" }}
            >
              <Row>
                <Col>Shipping</Col>

                <Col>${order.shippingCharge}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                padding: "20px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {" "}
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item
              style={{
                padding: "20px",
              }}
            >
              <Row
                style={{
                  padding: "15px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  width: "100%",
                  backgroundColor: "#2c3e50",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                <Col>Status</Col>
                <Col md={6}>
                  {isEdit ? (
                    <Form.Control
                      as="select"
                      onChange={(e) =>
                        updateOrderStatusHandler(order._id, e.target.value)
                      }
                    >
                      <option>pending</option>
                      <option>in progress</option>
                      <option>cancelled</option>
                      <option>delivered</option>
                    </Form.Control>
                  ) : (
                    <Badge bg={orderStatusColor[order.status]}>
                      {order.status}
                    </Badge>
                  )}
                </Col>
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <Col>
                    <FaEdit onClick={() => setIsEdit(true)} />
                  </Col>
                )}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderPage;
