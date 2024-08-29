const path = require("path");

const setDefaultProtocolClient = (app, protocolName) => {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(protocolName, process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient(protocolName);
  }
};

module.exports = { setDefaultProtocolClient };
