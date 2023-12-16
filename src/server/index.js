const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios"); // For making API calls
const dotenv = require("dotenv").config();

const app = express();
app.use(express.static("dist/client"));

const port = 3000;
const apiKey = process.env.API_KEY;

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/sum_api", async (req, res) => {
  const text = req.body.text; // Get user-submitted text
  const sentences = req.body.sentences || 5; // Sentence count or default

  console.log(text, sentences);

  const formdata = new FormData();
  formdata.append("key", apiKey); // Use your actual API key
  formdata.append("source_text", text); // Correct key for text parameter
  formdata.append("sentences", sentences);

  const url = "https://api.meaningcloud.com/summarization-1.0";
  const options = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: {
      "Content-Type": "multipart/form-data", // Update content type for FormData
    },
  };

  try {
    const response = await axios(url, options);
    const data = await response.json();
    const summary = data.summary;

    res.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error summarizing text",
    });
  }
});
app.listen(port, function () {
  console.log("Heyyyyyyyyyyyyyyy");
  console.log(`Server listening on port ${port}`);
});
