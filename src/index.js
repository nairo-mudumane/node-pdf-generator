require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const db = require("./database");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers: db.passengers }, (err, html) => {
    if (err) {
      return res.status(500).json({ message: "error on file loading" });
    } else {
      const options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        },
      };

      pdf.create(html, options).toFile("report.pdf", (err, result) => {
        console.log(result);
      });

      return res.status(200).send(html);
    }
  });
});

app.listen(PORT, () => console.log(`running on : ${PORT}`));
