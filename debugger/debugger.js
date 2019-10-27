const { ipcRenderer } = require('electron');
const TIMES = {
  's': 1,
  'd': 2,
  't': 3,
};
window.addEventListener('DOMContentLoaded', () => {
  ["reset", "change", "up", "down"].forEach(id => {
    document.getElementById(id).onclick = () => ipcRenderer.send('debug-hit', id);
  })
  document.querySelectorAll('#dartboard #areas g').forEach((e) => {
    const children = e.children;
    for (let i = 0; i < children.length; i++) {
      const elem = children[i];
      elem.onclick = function() {
        console.log(this.id);
        let target;
        switch (this.id) {
          case 'Outer':
            target = 'SB';
            break;
          case 'Bull':
            target = 'DB';
            break;
          default: {
            const t = this.id[0];
            target = `${this.id.replace(t, '')}-${TIMES[t]}`;
            break;
          }
        }
        console.log(target);
        ipcRenderer.send('debug-hit', target);
      };
      elem.onmouseenter = function() {
        elem.style.opacity = '0.6';
      };
      elem.onmouseleave = function() {
        elem.style.opacity = '1';
      };
    }
  });
});