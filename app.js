let token = null;
const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
  const prices = JSON.parse(event.data);
  updateStockList(prices);
};

function showAuth() {
  document.getElementById('auth').style.display = 'block';
  document.getElementById('watchlist').style.display = 'none';
}

function showWatchlist() {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('watchlist').style.display = 'block';
  fetchWatchlist();
}

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  });
  
  if (response.ok) login();
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  if (data.token) {
    token = data.token;
    showWatchlist();
  }
}

async function fetchWatchlist() {
  const response = await fetch('/api/watchlist', {
    headers: { 'Authorization': token }
  });
  const watchlist = await response.json();
  updateStockList({});
}

async function addStock() {
  const symbol = document.getElementById('stockSymbol').value.toUpperCase();
  await fetch('/api/watchlist', {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ symbol })
  });
  fetchWatchlist();
}

async function setAlert() {
  const symbol = document.getElementById('stockSymbol').value.toUpperCase();
  const price = parseFloat(document.getElementById('alertPrice').value);
  const type = document.getElementById('alertType').value;
  
  await fetch('/api/alert', {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ symbol, price, type })
  });
}

function updateStockList(prices) {
  const stockList = document.getElementById('stockList');
  fetch('/api/watchlist', {
    headers: { 'Authorization': token }
  })
    .then(res => res.json())
    .then(watchlist => {
      stockList.innerHTML = watchlist.map(symbol => 
        `<div>${symbol}: $${prices[symbol] || 'Loading...'}</div>`
      ).join('');
    });
}

// Initial state
showAuth();
