const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const convert = require('./src/converter');
const HID = require('node-hid');

let timer, device;
const close = () => {
  if (device) {
    device.pause();
    device.close();
  }
};
process.on('SIGTERM', close);
process.on('SIGINT', close);
process.on('SIGHUP', close);
const findDevice = () => {
  if (timer) return;
  console.log('search darts board....');
  timer = setInterval(() => {
    const devices = HID.devices();
    const dev = devices.find(d => d.vendorId === 7171 && d.productId === 1);
    if (dev != null) {
      device = new HID.HID(7171, 1);
      console.log('found.');
      clearInterval(timer);
      timer = null;
      device.on('data', buf => {
        const score = convert(buf);
        io.emit('hit', score);
      });
      device.on('error', e => {
        console.log('******** ERRROR *********');
        console.error(e);
        findDevice();
      });
    }
  }, 100);
};

findDevice();

app.use('/debugger', express.static('debugger'));
app.use('/', express.static('dist'));
io.on('connection', socket => {
  console.log('connected');
  socket.on('debug-hit', msg => {
    console.log('debug hit', msg);
    io.emit('hit', msg);
  });
});
http.listen(3000, () => console.log('server listening on port 3000'));
