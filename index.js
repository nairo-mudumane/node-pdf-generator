const pdf = require("html-pdf");
const ejs = require("ejs");

const name = "Nairo Mudumane";
const billing = 23000;
const file_name = `file_${Math.floor(Math.random())}`;

const html = ejs.renderFile(
  "./template.ejs",
  { name: name, billing: billing },
  (err, res) => {
    if (err) {
      return null;
    } else {
      return res;
    }
  }
);

console.log(html);

if (html) {
  pdf.create(html, {}).toFile(`${file_name}.pdf`, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
} else {
  // console.log("no html");
}
