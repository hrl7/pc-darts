const { ipcRenderer } = require('electron');
console.log('hello world');
ipcRenderer.on("device", console.log);
ipcRenderer.send("ready");

let score = 0, round = 0, flights = 0;

ipcRenderer.on("hit", (_, result) => {
  console.log(result);
  if (!result )return ;

  if (result === 'reset') {
    score = 0;
    round = 0;
    flights = 0;
    console.log('new game');
    document.getElementById("score").textContent = score;
    document.getElementById("round").textContent = round;
    return;
  }

  if (result === 'change') {
    round++;
    flights = 0;
    console.log(`round ${round}. score: ${score}`);
    document.getElementById("score").textContent = score;
    document.getElementById("round").textContent = round;
    return;
  }
  if (flights >= 3) return;
  flights++;

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

  const [target, times] = result.split('-').map(Number);
  console.log(`${target} x ${times}`);
  score += target * times;
  document.getElementById("score").textContent = score;
  document.getElementById("round").textContent = round;
})
