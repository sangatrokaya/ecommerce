import colors from "colors";
import fs from "fs";
import path from "path";

function logger(req, res, next) {
  let reqColors = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };
  let today = new Date();
  let start = Date.now();
  let formattedDate = `Date ${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()} | Time ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  res.on("finish", () => {
    let end = Date.now();
    console.log(
      `[${formattedDate}] :: ${req.method} ${req.originalUrl} | ${
        req.ip
      } | StatusCode: ${res.statusCode} | ResponseDuration: ${end - start} ms`[
        reqColors[req.method]
      ]
    );
    let msg = `[${formattedDate}] :: ${req.method} ${req.originalUrl} | ${
      req.ip
    } | StatusCode: ${res.statusCode} | ResponseDuration: ${end - start} ms`;
    let __dirname = path.resolve();
    fs.appendFile(path.join(__dirname, "app.log"), msg + "\n", (err) => {
      if (err) console.log(err.message);
    });
  });

  next();
}

export default logger;
