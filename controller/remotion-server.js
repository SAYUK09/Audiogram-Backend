const { bundle } = require("@remotion/bundler");
const { getCompositions, renderMedia } = require("@remotion/renderer");
const path = require("path");

async function renderRemotionVideo(
  compositionId,
  inputProps,
  outputLocation,
  height,
  width
) {
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await bundle({
    entryPoint: path.resolve("../Audiogram/remotion/index.tsx"),
    webpackOverride: (config) => config,
  });

  const comps = await getCompositions(bundleLocation, {
    inputProps,
  });

  const composition = comps.find((c) => c.id === compositionId);
  console.log(compositionId);
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found`);
  }

  console.log("Attempting to render:", outputLocation);
  await renderMedia({
    composition: { ...composition, height, width },
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
  });

  console.log("Render done!");
}

module.exports = {
  renderRemotionVideo,
};
