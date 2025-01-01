import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

connectDb();

async function importData() {
  await User.deleteMany();
  await Product.deleteMany();

  let newUsers = await User.insertMany(users);
  try {
    await Product.insertMany(
      products.map((product) => {
        return {
          ...product,
          user: newUsers[0]._id,
        };
      })
    );
    console.log("Data Loaded Successfully!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data Cleared Successfully!".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

// importData();
// destroyData();
// console.log(process.argv);

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
