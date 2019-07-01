/* eslint-env node */
/* eslint-disable import/no-commonjs, import/no-nodejs-modules */
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const fs = require("fs");
const Mustache = require("mustache");

const app = express();
const port = process.env.PORT || 5000;
const distDir = path.join(__dirname, "dist");

const transport = nodemailer.createTransport(
  mailgun({
    auth: {
      api_key: "8893d6af8ebe9310e8de487f0cb72285-16ffd509-57a2bc62",
      domain: "sandboxaa8596055ceb43c983a2f4556d7cd862.mailgun.org"
    }
  })
);

/**
 * Serve static assets (img, scripts, etc)
 */
app.use(serveStatic(path.join(distDir)));

// Email template test
app.use(bodyParser.json());
app.post("/api/mail", function(req, res) {
  fs.readFile(__dirname + "/mail.handlebars", "utf8", (err, template) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    transport.sendMail({
      from: "tester@sandboxaa8596055ceb43c983a2f4556d7cd862.mailgun.org",
      to: req.body.to,
      subject: "Lego test",
      html: Mustache.render(template, {
        base: process.env.EMAIL_BASE || "https://lego-toyfinder.herokuapp.com/",
        url: req.body.url,
        items: req.body.items
      })
    });
    res.send({ send: true });
  });
});

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
