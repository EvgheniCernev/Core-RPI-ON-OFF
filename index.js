const express = require('express');
const cors = require('cors');
const app = express();
var gpio = require('rpi-gpio');
gpio.setup(16, gpio.DIR_OUT);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.post('/on', function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('on', req.body);
  gpio.write(16, true, function(err) {
    if (err) throw err;
    res.send({ status: 'on' });
  });
});

app.post('/off', function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('off', req.body);
  gpio.write(16, false, function(err) {
    if (err) throw err;
    res.send({ status: 'off' });
  });
});

//start your server on port 3001
app.listen(3001, () => {
  console.log('Server Listening on port 3001');
});
