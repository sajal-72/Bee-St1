const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
const cookieParser = require('cookie-parser')
require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth"));

const PORT = process.env.PORT;


app.get("/",  (req, res) => {
  res.send(`Hi There`);
});

app.get("/contact", (req, res) => {
  res.cookie("vbf","saksham");
  res.send(`Contact`);
});

app.get("/about", (req, res) => {
  res.send(`About section`);
});

app.listen(PORT, () => {
  console.log(`Running successfully on port ${PORT}`);
});
