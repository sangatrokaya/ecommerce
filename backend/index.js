import { app } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server is Up and Running at PORT ${PORT}`)
  );
});
