/* eslint-env node */
/* eslint-disable import/no-commonjs, import/no-nodejs-modules */
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
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
      api_key: "key-1234123412341234",
      domain:
        "one of your domain names listed at your https://mailgun.com/app/domains"
    },
    proxy: "http://user:pass@localhost:8080" // optional proxy, default is false
  })
);

/**
 * Serve static assets (img, scripts, etc)
 */
app.use(serveStatic(path.join(distDir)));

app.get("/api/mail", function(req, res) {
  // Test template
  fs.readFile(__dirname + "/src/mail.handlebars", "utf8", (err, template) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(
      Mustache.render(template, {
        base: process.env.EMAIL_BASE || "https://lego-toyfinder.herokuapp.com/",
        items: [
          {
            image: "http://placehold.it/500x500",
            title: "Titel",
            description: "Description"
          }
        ]
      })
    );
  });
});
app.post("/api/mail", function(req, res) {
  transport.sendMail({
    //   from: "myemail@example.com",
    //   to: "recipient@domain.com", // An array if you have multiple recipients.
    //   cc: "second@domain.com",
    //   bcc: "secretagent@company.gov",
    //   subject: "Hey you, awesome!",
    //   "h:Reply-To": "reply2this@company.com",
    //   //You can use "html:" to send HTML email content. It's magic!
    //   html: "<b>Wow Big powerful letters</b>",
    //   //You can use "text:" to send plain-text content. It's oldschool!
    //   text: "Mailgun rocks, pow pow!"
  });
  res.send({ send: true });
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
