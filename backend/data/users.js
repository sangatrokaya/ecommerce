import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
  {
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
];

export default users;
