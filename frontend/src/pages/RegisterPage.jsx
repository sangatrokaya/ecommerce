import FormContainer from "../components/FormContainer";
import { Card, FormGroup, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const RegisterPage = () => {
  return (
    <FormContainer>
      <Card
        className="shadow p-4 rounded"
        style={{ margin: "auto", maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <FormGroup controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                // value={email}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                // value={password}
              ></Form.Control>
            </FormGroup>
            <Button type="submit" variant="primary" className="w-100 mt-2">
              Sign Up
            </Button>
          </Form>
          <Row className="py-3 text-center">
            <Col>
              Already Registered?
              <Link to="/signin" className="text-decoration-none">
                Log In
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default RegisterPage;
