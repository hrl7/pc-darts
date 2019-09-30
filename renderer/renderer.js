import { ipcRenderer } from 'electron';
import ReactDOM from 'react-dom';
import React, { useReducer, useEffect } from 'react';
import EventEmitter from 'eventemitter3';
import { App } from './App';

ipcRenderer.on('device', console.log);
ipcRenderer.send('ready');

const dartsBoardEvent = new EventEmitter();
ipcRenderer.on('hit', (_, result) => {
  if (!result) return;

  if (result === 'reset') {
    dartsBoardEvent.emit('reset');
    return;
  }

  if (result === 'change') {
    dartsBoardEvent.emit('change');
    return;
  }

  dartsBoardEvent.emit('hit', result);
});

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App dartsBoardEvent={dartsBoardEvent} />, document.getElementById('root'));
});
