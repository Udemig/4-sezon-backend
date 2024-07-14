const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoute");
const morgan = require("morgan");
const app = express();

// gelen istekleri loglar
app.use(morgan("dev"));

// gelen isteklerin body'sini işle
app.use(express.json());

// turlar ile alakalı yolları projey tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/auth")

module.exports = app;
