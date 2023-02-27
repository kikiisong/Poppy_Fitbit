const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const app = express();
app.use(cors());

var heartrate;
var command;

var nap;

app.get('/heartrate', (req, res) => {
    console.log(heartrate);
    res.status(201).send(JSON.stringify(heartrate));
});

app.post('/heartrate', (req, res) => {
    heartrate=req.body;
    console.log(heartrate);
    res.status(201).send(JSON.stringify(heartrate));
});

app.get('/command', (req, res) => {
  console.log(command);
  res.status(201).send(JSON.stringify(command));
});

app.post('/command', (req, res) => {
  command=req.body;
  console.log(command);
  res.status(201).send(JSON.stringify(command));
});

app.get('/alarm', (req, res) => {
  res.status(201).send(JSON.stringify(nap));
});

app.post('/alarm', (req, res) => {
  nap = req.body;
  res.status(201).send(JSON.stringify(nap));
});

exports.user = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
