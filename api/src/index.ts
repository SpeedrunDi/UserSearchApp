import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

interface User {
  email: string;
  number: string;
}

const users: User[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.json'), 'utf-8'));

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateNumber = (number: string): boolean => {
  const re = /^\d{6}$/;
  return re.test(number);
};

app.post('/search', (req, res) => {
  const { email, number } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (number && !validateNumber(number)) {
    return res.status(400).json({ error: 'Invalid number format' });
  }

  setTimeout(() => {
    const filteredUsers = users.filter((user: User) =>
      user.email.includes(email) && (!number || user.number === number)
    );
    res.json(filteredUsers);
  }, 5000);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
