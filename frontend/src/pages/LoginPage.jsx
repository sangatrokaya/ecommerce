import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Card, FormGroup, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <FormContainer>
      <Card
        className="shadow p-4 rounded"
        style={{ margin: "auto", maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <Button type="submit" variant="primary" className="w-100 mt-2">
              Sign In
            </Button>
          </Form>
          <Row className="py-3 text-center">
            <Col>
              New Customer?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginPage;
