import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signUp = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let userExists = await User.findOne({ email });
    if (userExists) {
      let err = new Error(`User with email ${email} already exists!`);
      err.status = 400; // 400 refers to bad request
      throw err;
    }
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let user = await User.create({ ...req.body, password: hashedPassword });
    res.send({
      message: "User Registered Successfully!",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

export { signUp };
