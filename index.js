const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { renderRemotionVideo } = require("./controller/remotion-server");
const { uploadVideoToCloudinary } = require("./utility");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("Hiting /");
  res.send("I am On!");
});

app.post("/render-video", async (req, res) => {
  console.log("hiting /render-video");
  const { inputProps } = req.body;
  const compositionId = "Audiogram";
  const outputLocation = `./out/${req.body.fileName}.mp4`;
  const height = req.body.height;
  const width = req.body.width;
  const duration = req.body.duration;

  try {
    await renderRemotionVideo(
      compositionId,
      inputProps,
      outputLocation,
      height,
      width,
      duration
    );

    const data = await uploadVideoToCloudinary(outputLocation);

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering video");
  }
});

app.listen(5000, () => {
  console.log("server START");
});
