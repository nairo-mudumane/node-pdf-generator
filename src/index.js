require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const puppeteer = require("puppeteer");
const db = require("./database");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/pdf", async (request, response) => {
  // open browser
  const browser = await puppeteer.launch({ headless: true });

  // goto page
  const page = await browser.newPage();
  await page.goto(`http://localhost:${process.env.PORT}`, {
    waitUntil: "networkidle0",
  });

  // generating pdf
  const finalPdf = await page.pdf({
    printBackground: true,
    format: "LETTER",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px",
    },
  });

  // close browser
  await browser.close();

  response.contentType("application/pdf");
  return response.status(200).send(finalPdf);
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers: db.passengers }, (err, html) => {
    if (err) {
      return res.status(500).json({ message: "error on file loading" });
    } else {
      return res.status(200).send(html);
    }
  });
});

app.listen(PORT, () => console.log(`running on : ${PORT}`));
