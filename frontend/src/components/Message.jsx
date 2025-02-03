import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <>
      <Alert
        variant={variant}
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)", // Subtle white glow
          background: "rgba(26, 26, 26, 0.7)", // Semi-transparent dark background
          color: "#fff", // White text for contrast
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for depth
          backdropFilter: "blur(8px)", // Glass effect
        }}
      >
        {children}
      </Alert>
    </>
  );
};

Message.defaultProps = {
  variant: "primary",
};

export default Message;
