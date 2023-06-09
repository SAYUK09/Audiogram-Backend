const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {renderRemotionVideo} = require("./controller/remotion-server");
const {uploadVideoToCloudinary} = require("./utility");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("I am On!");
});

app.post("/render-video", async (req, res) => {
  const {inputProps} = req.body;
  const compositionId = "Audiogram";
  const outputLocation = `out/${compositionId}.mp4`;

  try {
    await renderRemotionVideo(compositionId, inputProps, outputLocation);

    const data = await uploadVideoToCloudinary("./out/Audiogram.mp4");

    res.status(200).json({data});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering video");
  }
});

app.listen(5000, () => {
  console.log("server START");
});
