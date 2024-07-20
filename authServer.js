const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const users = {}; // This should be replaced with a real database in production
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };
  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: `Hello, ${user.username}` });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));