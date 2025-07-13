const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { _id: 1, name: 'Alice', email: 'alice@example.com', password: bcrypt.hashSync('123456', 8), role: 'admin' },
  { _id: 2, name: 'Bob', email: 'bob@example.com', password: bcrypt.hashSync('123456', 8), role: 'user' }
];

app.post('/api/login', (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, 'secret123', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/users', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.sendStatus(403);
  try {
    jwt.verify(auth.split(' ')[1], 'secret123');
    res.json(users);
  } catch (err) {
    res.sendStatus(403);
  }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
