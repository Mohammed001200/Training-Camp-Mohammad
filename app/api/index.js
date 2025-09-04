require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Filuppladdning
app.use('/upload', require('./routes/upload'));

// Auth: Register
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email och lösenord krävs.' });
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'E-post redan registrerad.' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash } });
  res.json({ id: user.id, email: user.email });
});

// Auth: Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Fel e-post eller lösenord.' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Fel e-post eller lösenord.' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email } });
});

// Skyddad route exempel (dashboard)
app.get('/dashboard', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Ingen token.' });
  try {
    const { userId } = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET || 'supersecret');
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(401).json({ error: 'Ogiltig token.' });
    res.json({ message: 'Välkommen till dashboard!', user: { id: user.id, email: user.email } });
  } catch (e) {
    res.status(401).json({ error: 'Ogiltig token.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('API server running on port', PORT);
});
