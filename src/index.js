require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(PORT, () => console.log(`running on : ${PORT}`));
