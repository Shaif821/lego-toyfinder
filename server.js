/* eslint-env node */
/* eslint-disable import/no-commonjs, import/no-nodejs-modules */
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");

const app = express();
const port = process.env.PORT || 5000;
const distDir = path.join(__dirname, "dist");

/**
 * Serve static assets (img, scripts, etc)
 */
app.use(serveStatic(path.join(distDir)));

/**
 * Catch all redirect to index.html. Vue router will take it from there.
 * All uri's that need to be directly accessible should be define above this
 * catch-all method.
 */
app.use(history());

app.use("*", function(req, resp) {
  resp.sendFile(path.join(distDir, "./index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server successfully deployed at port: " + port); // eslint-disable-line
});
