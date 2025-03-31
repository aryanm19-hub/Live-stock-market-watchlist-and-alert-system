const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const auth = require('./auth');
const stockData = require('./stockData');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Mock user database
const users = new Map();

// WebSocket connection for real-time updates
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send stock updates every 5 seconds
  const interval = setInterval(() => {
    const updates = stockData.getStockUpdates();
    ws.send(JSON.stringify(updates));
  }, 5000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

// Authentication routes
app.post('/api/register', auth.register);
app.post('/api/login', auth.login);

// Stock watchlist routes
app.get('/api/watchlist', auth.verifyToken, (req, res) => {
  const userId = req.userId;
  const watchlist = stockData.getUserWatchlist(userId);
  res.json(watchlist);
});

app.post('/api/watchlist', auth.verifyToken, (req, res) => {
  const userId = req.userId;
  const { symbol } = req.body;
  stockData.addToWatchlist(userId, symbol);
  res.json({ success: true });
});

app.post('/api/alert', auth.verifyToken, (req, res) => {
  const userId = req.userId;
  const { symbol, price, type } = req.body;
  stockData.setPriceAlert(userId, symbol, price, type);
  res.json({ success: true });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
