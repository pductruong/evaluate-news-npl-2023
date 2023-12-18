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

app.post("/sum_api", async (req, res) => {
  const text = req.body.text;
  const sentences = req.body.sentences || 5;

  const url = "https://api.meaningcloud.com/summarization-1.0";

  const formdata = new FormData();
  formdata.append("key", apiKey);
  formdata.append("txt", text);
  formdata.append("sentences", sentences);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.json({
      success: false,
      message: "Error summarizing text",
    });
  }
});
// Define a route for the test API
app.post("/test_api", (req, res) => {
  // Extract JSON data from the request body
  const requestData = req.body;

  // Echo the received JSON data in the response
  res.json({
    success: true,
    message: "Data received successfully",
    data: requestData,
  });
});
