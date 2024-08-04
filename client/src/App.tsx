import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import './App.css';

interface User {
  email: string;
  number: string;
}

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  let source = axios.CancelToken.source();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateNumber = (number: string): boolean => {
    const re = /^\d{2}-\d{2}-\d{2}$/;
    return re.test(number);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    setNotFound(false);

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    if (number && !validateNumber(number)) {
      setError('Invalid number format');
      setLoading(false);
      return;
    }

    try {
      source.cancel('Operation canceled due to new request.');
      source = axios.CancelToken.source();
      const response = await axios.post(
        'http://localhost:3001/search',
        { email, number: number.replace(/-/g, '') },
        { cancelToken: source.token }
      );
      setUsers(response.data);
      if (response.data.length === 0) {
        setNotFound(true);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        setError('Error fetching users');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number: </label>
          <InputMask
            mask="99-99-99"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {notFound && <p>No users found</p>}
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.email} - {user.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
