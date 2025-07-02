const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
const targetInfo = document.getElementById('target-info');
const lockBtn = document.getElementById('lockBtn');
const abortBtn = document.getElementById('abortBtn');

let targets = [
  { x: 100, y: 80, type: 'aircraft_carrier' },
  { x: 200, y: 150, type: 'destroyer' },
  { x: 300, y: 200, type: 'awacs' },
  { x: 250, y: 100, type: 'civilian_ship' }
];

let selectedTarget = null;

function drawRadar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  targets.forEach(t => {
    ctx.beginPath();
    ctx.arc(t.x, t.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = {
      'aircraft_carrier': 'red',
      'destroyer': 'orange',
      'awacs': 'blue',
      'civilian_ship': 'gray'
    }[t.type] || 'white';
    ctx.fill();
    ctx.closePath();
  });

  if (selectedTarget) {
    ctx.beginPath();
    ctx.arc(selectedTarget.x, selectedTarget.y, 14, 0, Math.PI * 2);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  selectedTarget = targets.find(t => Math.hypot(t.x - x, t.y - y) < 15);
  if (selectedTarget) {
    targetInfo.textContent = `Target: ${selectedTarget.type.toUpperCase()}`;
  } else {
    targetInfo.textContent = 'No target selected';
  }
  drawRadar();
});

lockBtn.addEventListener('click', () => {
  if (!selectedTarget) {
    alert('No target selected.');
    return;
  }

  if (selectedTarget.type === 'civilian_ship') {
    alert('Engagement denied: Civilian target detected.');
  } else {
    alert(`Locked on ${selectedTarget.type.toUpperCase()}. Preparing to engage.`);
  }
});

abortBtn.addEventListener('click', () => {
  alert('Mission aborted. Returning all drones to base.');
  selectedTarget = null;
  targetInfo.textContent = 'No target selected';
  drawRadar();
});

drawRadar();
