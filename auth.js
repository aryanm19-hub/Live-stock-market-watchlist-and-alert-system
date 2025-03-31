const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // In production, use environment variable

const users = new Map();

function register(req, res) {
  const { username, password, email } = req.body;
  if (users.has(username)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users.set(username, { password, email, watchlist: [] });
  res.json({ success: true });
}

function login(req, res) {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, secretKey);
  res.json({ token });
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.username;
    next();
  });
}

module.exports = { register, login, verifyToken };
