const { bundle } = require("@remotion/bundler");
const { getCompositions, renderMedia } = require("@remotion/renderer");
const path = require("path");

let bundleLocation; // Store bundle location for reuse

async function createBundleIfNeeded() {
  if (!bundleLocation) {
    console.log("Creating a Webpack bundle of the video");
    bundleLocation = await bundle({
      entryPoint: path.resolve("../Audiogram/remotion/index.tsx"),
      outDir: path.resolve("../Audiogram-Backend/remotion_bundler"),
      webpackOverride: (config) => config,
    });
    console.log(bundleLocation, "bundle location");
  }
}

async function renderRemotionVideo(
  compositionId,
  inputProps,
  outputLocation,
  height,
  width,
  duration
) {
  // await createBundleIfNeeded();

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
    composition: { ...composition, height, width, durationInFrames: duration },
    serveUrl: path.join(process.cwd(), "remotion_bundler"),
    codec: "h264",
    outputLocation,
    inputProps,
  });

  console.log("Render done!");
}

module.exports = {
  renderRemotionVideo,
};
