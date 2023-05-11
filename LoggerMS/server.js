const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Producer = require("./producer");
const producer = new Producer();
app.use(bodyParser.json());

app.post("/sendLog", async (req, res, next) => {
  await producer.publishMessge(req.body.logType, req.body.message);
  res.send();
});

app.listen(3030, () => {
  console.log("connected successfully");
});
