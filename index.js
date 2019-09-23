/*
const usb = require('usb');
const board = usb.getDeviceList().find(d => d.deviceDescriptor.idVendor === 7171);
if (!board) {
  console.error("pcdarts not found");
  process.exit(1);
}
board.__open();
board.__claimInterface(0);
const _interface = board.interface(0);
const inEndpoint = _interface.endpoint(131)
//inEndpoint.claim();
inEndpoint.on("data", console.log);
*/

const BUF_TO_POINT = {
  '10 1': 'DB',
  '10 2': 'SB',

  '0 1': '20-1',
  '0 2': '12-1',
  '0 4': '14-1',
  '0 8': '8-1',
  '0 16': '7-1',
  '7 32': '3-1',
  '7 64': '2-1',
  '7 128': '10-1',
  '8 128': '13-1',
  '9 128': '18-1',
  '9 1': '5-1',
  '8 1': '9-1',
  '0 128': '11-1',
  '0 64': '16-1',
  '0 32': '19-1',
  '7 16': '17-1',
  '7 8': '15-1',
  '7 4': '6-1',
  '7 2': '4-1',
  '7 1': '1-1',

  '3 1': '20-3',
  '3 2': '12-3',
  '3 4': '14-3',
  '3 8': '8-3',
  '3 16': '7-3',
  '4 32': '3-3',
  '4 64': '2-3',
  '4 128': '10-3',
  '8 16': '13-3',
  '9 16': '18-3',
  '9 8': '5-3',
  '8 8': '9-3',
  '3 128': '11-3',
  '3 64': '16-3',
  '3 32': '19-3',
  '4 16': '17-3',
  '4 8': '15-3',
  '4 4': '6-3',
  '4 2': '4-3',
  '4 1': '1-3',

  '1 1': '20-1',
  '1 2': '12-1',
  '1 4': '14-1',
  '1 8': '8-1',
  '1 16': '7-1',
  '6 32': '3-1',
  '6 64': '2-1',
  '6 128': '10-1',
  '8 64': '13-1',
  '9 64': '18-1',
  '9 2': '5-1',
  '8 2': '9-1',
  '1 128': '11-1',
  '1 64': '16-1',
  '1 32': '19-1',
  '6 16': '17-1',
  '6 8': '15-1',
  '6 4': '6-1',
  '6 2': '4-1',
  '6 1': '1-1',

  '2 1': '20-2',
  '2 2': '12-2',
  '2 4': '14-2',
  '2 8': '8-2',
  '2 16': '7-2',
  '5 32': '3-2',
  '5 64': '2-2',
  '5 128': '10-2',
  '8 32': '13-2',
  '9 32': '18-2',
  '9 4': '5-2',
  '8 4': '9-2',
  '2 128': '11-2',
  '2 64': '16-2',
  '2 32': '19-2',
  '5 16': '17-2',
  '5 8': '15-2',
  '5 4': '6-2',
  '5 2': '4-2',
  '5 1': '1-2',

  '11 1': 'reset',
  '11 2': 'reset',
  '11 4': 'change',
};

const HID = require('node-hid');
const device = new HID.HID(7171, 1);
let score = 0,
  round = 0,
  waiting = false;
device.on('data', buf => {
  for (let i = 0; i < 12; i++) {
    if (buf[i]) {
      if (waiting) return;
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, 500);
      //console.log(i, buf[i]);
      const s = BUF_TO_POINT[`${i} ${buf[i]}`];
      if (!s) {
        console.error('undefined.');
        console.log(i, buf[i]);
        break;
      }
      if (s === 'SB') {
        console.log('Single Bull');
      } else if (s === 'DB') {
        console.log('Double Bull');
      } else if (s === 'reset') {
        score = 0;
      } else if (s === 'change') {
        round++;
        console.log(`round ${round}. score: ${score}`);
      } else {
        const [target, times] = s.split('-').map(Number);
        console.log(`${target} x ${times}`);
        score += target * times;
      }
    }
  }
});

const close = () => {
  device.pause();
  device.close();
};
process.on('SIGTERM', close);
process.on('SIGINT', close);
process.on('SIGHUP', close);
