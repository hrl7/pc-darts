import ReactDOM from 'react-dom';
import React, { useReducer, useEffect } from 'react';
import EventEmitter from 'eventemitter3';
import { App } from './App';
import io from 'socket.io-client';

const socket = io();
window.socket = socket;

socket.on('device', console.log);
socket.send('ready');

const dartsBoardEvent = new EventEmitter();
socket.on('hit', result => {
  console.log('hit: ', result);
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
