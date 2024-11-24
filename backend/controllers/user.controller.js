import User from "../models/user.model.js";

const signUp = async (req, res, next) => {
  try {
    let { email } = req.body;
    let userExists = await User.findOne({ email });
    if (userExists) {
      let err = new Error(`User with email ${email} already exists!`);
      err.status = 400; // 400 refers to bad request
      throw err;
    }
    let user = await User.create(req.body);
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
