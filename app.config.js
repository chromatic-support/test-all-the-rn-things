// Dynamic config so plugins not supported in static app.json can be configured here.
const baseConfig = require('./app.json');

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  ...baseConfig.expo,
  plugins: [
    ...baseConfig.expo.plugins,
  ],
};
