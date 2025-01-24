import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer
        className="bg-dark text-light py-5"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
        }}
      >
        <Container>
          <Row className="gy-4">
            {" "}
            {/* Section 1: Branding */}
            <Col md={4}>
              <h5 className="fw-bold">Tech Vault</h5>
              <p>Your one-stop for tech essentials and gadgets.</p>
            </Col>
            {/* Section 2: Quick Links */}
            <Col md={2}>
              <h6 className="fw-bold">Quicks Links</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="/about" className="text-light text-decoration-none">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-light text-decoration-none"
                  >
                    Contacts
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-light text-decoration-none"
                  >
                    Privacy & Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-light text-decoration-none">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-light text-decoration-none"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </Col>
            {/* Section 3: Contact Information */}
            <Col md={3}>
              <h6 className="fw-bold">Contact Us</h6>
              <p>
                Address: 123 Tech Street, Surkhet Valley, Nepal
                <br />
                Email: support@techvault.com
                <br />
                Phone: 083-521679
              </p>
            </Col>
            {/* Section 4: Newsletter Sign Up */}
            <Col md={3}>
              <h6 className="fw-bold">Stay Connected!</h6>
              <Form>
                <Form.Group controlId="newsletter">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="mb-2"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>

          {/* Section 5: Social Media Links */}
          <div className="d-flex justify-content-center gap-1 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaInstagram size={20} />
            </a>
          </div>

          {/* Section 6: Bottom Footer */}
          <div className="text-center mt-4">
            <p className="mb-0">
              &copy; {currentYear}
              <span className="fw-bold"> Tech Vault</span>.
              <span className="fst-italic"> All Rights Reserved.</span>
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
