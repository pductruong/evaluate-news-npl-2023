const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("dist/client"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);
const port = 8080;
const apiKey = process.env.API_KEY;

// Error-handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});

app.post("/analyzeSentiment", async (req, res) => {
  const textToAnalyze = req.body.text;

  const url = "https://api.meaningcloud.com/sentiment-2.1";

  const formdata = new FormData();
  formdata.append("key", apiKey);
  formdata.append("txt", textToAnalyze);
  formdata.append("lang", "en");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const sentimentAnalyzeResult = await response.json();
    // console.log(sentimentAnalyzeResult);
    res.json({
      sentimentAnalyzeResult,
    });
  } catch (error) {
    console.error("Error making API request: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});
