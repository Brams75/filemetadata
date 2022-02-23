const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res, next) {
    const { originalname, mimetype, size } = req.file;
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.json({
      name: originalname,
      type: mimetype,
      size,
    });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
