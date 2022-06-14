const path = require("path");

const DEFAULT_OPTIONS = {
  pixelId: null,
  track: "ViewContent",
  autoViewContent: false,
  manualMode: false,
  disabled: false,
  debug: false,
};

module.exports = function tiktokPixelModule(moduleOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, this.options.tiktok, moduleOptions);
  options.dev = this.options.dev;

  if (options.pixels && options.pixels.length > 0) {
    options.pixels = options.pixels.map((option) => Object.assign({}, DEFAULT_OPTIONS, option));
  }

  if (!options.pixelId && !options.disabled) throw new Error("The default `pixelId` or `disabled` option is required.");

  this.addPlugin({
    src: path.resolve(__dirname, "./templates/plugin.js"),
    ssr: false,
    options,
  });
};

module.exports.meta = require("../package.json");
