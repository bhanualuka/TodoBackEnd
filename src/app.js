const express = require("express");
const { port } = require("./utilis/Constants");
const { ConnectDb } = require("./db/database");
const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRouter");
const cookieparser = require("cookie-parser");
const todoRouter = require("./routers/todoRouter");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieparser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", todoRouter);

ConnectDb()
  .then(() => {
    console.log("Database Estabalished Successfully");
    app.listen(port, () => {
      console.log("Server successfully running");
    });
  })
  .catch(() => {
    console.log("Database Connection Failed");
  });
