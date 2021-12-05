require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const dataRouter = require("./routes/dataRouter");
const citiesRouter = require("./routes/citiesRouter");
const specRouter = require("./routes/specRouter");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/data", dataRouter);
app.use("/spec", specRouter);
app.use("/cities", citiesRouter);

const start = async () => {
  try {
    app.listen(PORT, () => `Server is running on PORT: ${PORT}`);
  } catch (error) {
    console.error(error);
  }
};

start();
