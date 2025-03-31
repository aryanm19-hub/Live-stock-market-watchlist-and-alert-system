const nodemailer = require('nodemailer');

const watchlists = new Map();
const alerts = new Map();
const mockPrices = new Map([
  ['AAPL', 150.25],
  ['GOOGL', 2750.80],
  ['MSFT', 300.15]
]);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

function getUserWatchlist(userId) {
  return watchlists.get(userId) || [];
}

function addToWatchlist(userId, symbol) {
  if (!watchlists.has(userId)) {
    watchlists.set(userId, []);
  }
  const userWatchlist = watchlists.get(userId);
  if (!userWatchlist.includes(symbol)) {
    userWatchlist.push(symbol);
  }
}

function setPriceAlert(userId, symbol, price, type) {
  if (!alerts.has(userId)) {
    alerts.set(userId, []);
  }
  alerts.get(userId).push({ symbol, price, type });
}

function getStockUpdates() {
  // Simulate price changes
  mockPrices.forEach((value, key) => {
    const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
    mockPrices.set(key, Math.max(0, value + change));
    
    // Check alerts
    alerts.forEach((userAlerts, userId) => {
      userAlerts.forEach(alert => {
        const currentPrice = mockPrices.get(alert.symbol);
        if ((alert.type === 'above' && currentPrice >= alert.price) ||
            (alert.type === 'below' && currentPrice <= alert.price)) {
          sendAlertEmail(userId, alert);
        }
      });
    });
  });
  
  return Object.fromEntries(mockPrices);
}

function sendAlertEmail(userId, alert) {
  const user = require('./auth').users.get(userId);
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: `Price Alert: ${alert.symbol}`,
    text: `${alert.symbol} has reached ${mockPrices.get(alert.symbol)} (Target: ${alert.price} ${alert.type})`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
  });
}

module.exports = { getUserWatchlist, addToWatchlist, setPriceAlert, getStockUpdates };
