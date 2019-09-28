const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const convert = require('./src/converter');
const HID = require('node-hid');

let device;
//= new HID.HID(7171, 1);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('dist/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    if (device) {
      device.pause();
      device.close();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});

let timer;
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
      mainWindow.webContents.send('device', 'ready');
      device.on('data', buf => {
        const score = convert(buf);
        if (score) mainWindow.webContents.send('hit', score);
      });
      device.on('error', e => {
        console.log('******** ERRROR *********');
        console.error(e);
        findDevice();
      });
    }
  }, 100);
};

ipcMain.once('ready', () => {
  findDevice();
});
