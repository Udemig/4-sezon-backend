const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const morgan = require("morgan");
const app = express();

// gelen istekleri loglar
app.use(morgan("dev"));

// gelen isteklerin body'sini işle
app.use(express.json());

// turlar ile alakalı yolları projey tanıt
app.use(tourRouter);

module.exports = app;
