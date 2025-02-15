import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { FaUser, FaPhone, FaMapMarkerAlt, FaCity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);
  const [recipient, setRecipient] = useState(userInfo.name);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ recipient, address, city, phone }));
    navigate("/placeorder");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <FormContainer>
        <Card
          style={{
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Shipping Address</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="recipient" className="my-3">
                <Form.Label>
                  <FaUser className="me-2" />
                  Recipient Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Group>
              <Form.Group controlId="phone" className="my-3">
                <Form.Label>
                  <FaPhone className="me-2" />
                  Contact
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Group>
              <Form.Group controlId="address" className="my-3">
                <Form.Label>
                  <FaMapMarkerAlt className="me-2" />
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="house no./building/street/area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Group>
              <Form.Group controlId="city" className="my-3">
                <Form.Label>
                  <FaCity className="me-2" />
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="province/City/District"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ borderRadius: "10px" }}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="dark"
                  className="my-3"
                  style={{ borderRadius: "10px", padding: "10px" }}
                >
                  Continue
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </FormContainer>
    </div>
  );
};

export default ShippingPage;
