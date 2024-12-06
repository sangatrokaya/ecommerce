import jwt from "jsonwebtoken";

/**
 * Creates a JWT token for a user and stores it in a secure cookie.
 * @param {object} res - The response object used to send the cookie.
 * @param {string} userId - The unique identifier for the user.
 */
const createToken = (res, userId) => {
  // Generate a JWT token with the userId as payload
  // - `process.env.JWT_SECRET` is the secret key used to sign the token.
  // - The token will expire in 3 days.
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Store the generated token in a secure HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevent JavaScript access to the cookie (mitigates XSS attacks)
    secure: process.env.NODE_ENV != "development", // Use HTTPS in production
    sameSite: "strict", // Restrict the cookie to same-site requests (mitigates CSRF attacks)
    maxAge: 3 * 24 * 60 * 60 * 1000, // Set cookie expiration to 3 days (in milliseconds)
  });
};

export default createToken;
