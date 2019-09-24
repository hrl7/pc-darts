const convert = require('./src/converter');
const HID = require('node-hid');
const device = new HID.HID(7171, 1);
let score = 0,
  round = 0;
device.on('data', buf => {
  let result = convert(buf);

  if (!result) {
    return;
  }

  if (result === 'SB') {
    console.log('Single Bull');
    score += 50;
    return;
  }
  if (result === 'DB') {
    console.log('Double Bull');
    score += 50;
    return;
  }

  if (result === 'reset') {
    score = 0;
    round = 0;
    console.log('new game');
    return;
  }

  if (result === 'change') {
    round++;
    console.log(`round ${round}. score: ${score}`);
    return;
  }

  const [target, times] = result.split('-').map(Number);
  console.log(`${target} x ${times}`);
  score += target * times;
});

const close = () => {
  device.pause();
  device.close();
};
process.on('SIGTERM', close);
process.on('SIGINT', close);
process.on('SIGHUP', close);
