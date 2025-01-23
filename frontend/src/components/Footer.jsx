import { Container } from "react-bootstrap";
const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="lg bg-dark-subtle">
        <div className="py-5">
          <Container>
            <p className="text-center ">
              &copy; <span className="fw-bold">Tech Vault</span> {currentYear},
              <span className="fst-italic"> All Rights Reserved.</span>
            </p>
          </Container>
        </div>
      </footer>
    </>
  );
};

export default Footer;
