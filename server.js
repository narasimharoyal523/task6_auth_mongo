const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const SECRET = "secretkey123"; // In production, use an environment variable

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cognifyzUsers');

// Schema and Model
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

// Middleware to Protect Routes
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied: No Token Provided');

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send('Invalid Token');
  }
}

// Routes

// ✅ Home route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Cognifyz Task 6</h1>
    <p><a href="/register">Register</a> | <a href="/login">Login</a></p>
  `);
});

// Registration Page
app.get('/register', (req, res) => res.render('register'));

// Login Page
app.get('/login', (req, res) => res.render('login'));

// Register New User
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await new User({ email, password: hash }).save();
  res.send("✅ User registered. <a href='/login'>Login</a>");
});

// Login Existing User
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.send("❌ Invalid credentials. <a href='/login'>Try again</a>");
  }

  const token = jwt.sign({ _id: user._id }, SECRET);
  res.send(`✅ Login successful!<br>Your Token:<br><code>${token}</code>`);
});

// Protected Profile Page
app.get('/profile', authenticateToken, (req, res) => {
  res.send(`🔐 Welcome to your profile!<br>Your User ID: <strong>${req.user._id}</strong>`);
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
