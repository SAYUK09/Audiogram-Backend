const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {renderRemotionVideo} = require("./controller/remotion-server");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("I am On!");
});

app.post("/render", (req, res) => {
  console.log(req.body); // prints the request body to console
  res.send("Data received!"); // sends a response to the client
});

app.post("/render-video", async (req, res) => {
  const {inputProps} = req.body;
  const compositionId = "Audiogram";
  const outputLocation = `out/${compositionId}.mp4`;

  try {
    await renderRemotionVideo(compositionId, inputProps, outputLocation);
    res.status(200).json({data: "Video rendered successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering video");
  }
});

app.listen(5000, () => {
  console.log("server START");
});
