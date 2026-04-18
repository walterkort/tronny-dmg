const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json());

const SCORES_FILE = path.join(__dirname, 'scores.json');

function readScores() {
  try { return JSON.parse(fs.readFileSync(SCORES_FILE, 'utf8')); }
  catch { return []; }
}

function writeScores(list) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(list));
}

app.get('/api/scores', (req, res) => {
  res.json(readScores());
});

app.post('/api/scores', (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') return res.status(400).end();
  const list = readScores();
  list.push({ name: String(name).trim().slice(0, 20), score, date: new Date().toLocaleDateString('nl-NL') });
  list.sort((a, b) => b.score - a.score);
  writeScores(list.slice(0, 50));
  res.json({ ok: true });
});

const state = {
  players: {},      // socketId -> { name, score }
  phase: 'lobby',   // lobby | waiting | green | result
  round: 0,
  totalRounds: 5,
  winner: null,
  greenAt: null,
  timeout: null,
};

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

function broadcast() {
  io.emit('state', {
    phase: state.phase,
    round: state.round,
    totalRounds: state.totalRounds,
    players: Object.values(state.players).sort((a, b) => b.score - a.score),
    winner: state.winner,
  });
}

function startRound() {
  state.phase = 'waiting';
  state.winner = null;
  state.round++;
  broadcast();

  const delay = 2000 + Math.random() * 5000;
  state.timeout = setTimeout(() => {
    state.phase = 'green';
    state.greenAt = Date.now();
    broadcast();

    // Auto-advance if nobody taps within 4 seconds
    state.timeout = setTimeout(() => {
      if (state.phase === 'green') nextRound();
    }, 4000);
  }, delay);
}

function nextRound() {
  if (state.round >= state.totalRounds) {
    state.phase = 'lobby';
    state.round = 0;
    broadcast();
  } else {
    startRound();
  }
}

io.on('connection', (socket) => {
  socket.on('join', (name) => {
    const trimmed = String(name).trim().slice(0, 20) || 'Speler';
    state.players[socket.id] = { name: trimmed, score: 0 };
    broadcast();
  });

  socket.on('start', () => {
    if (state.phase !== 'lobby') return;
    state.round = 0;
    Object.values(state.players).forEach(p => p.score = 0);
    startRound();
  });

  socket.on('tap', () => {
    if (state.phase !== 'green') return;
    const player = state.players[socket.id];
    if (!player) return;

    clearTimeout(state.timeout);
    const reaction = Date.now() - state.greenAt;
    player.score++;
    state.winner = { name: player.name, reaction };
    state.phase = 'result';
    broadcast();

    state.timeout = setTimeout(nextRound, 2500);
  });

  socket.on('disconnect', () => {
    delete state.players[socket.id];
    broadcast();
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log(`\n🟢 Reaction Game draait!`);
  console.log(`   Lokaal:  http://localhost:${PORT}`);
  console.log(`   Telefoons: http://${ip}:${PORT}\n`);
});
