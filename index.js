const pdf = require("html-pdf");

const content = "<h1>Hello World</h1>";

pdf.create(content, {}).toFile("./pdf_file.pdf", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});
