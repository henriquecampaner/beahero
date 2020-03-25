import React, { useState } from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import herosImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import { Container } from './styles';

export default function LogIn() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogIn(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('something went wrong');
    }
  }

  return (
    <Container>
      <section>
        <img src={logo} alt="Be the Hero" />

        <form onSubmit={handleLogIn}>
          <h1>Log In</h1>

          <input
            type="text"
            placeholder="Your Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit" className="button">
            Log In
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />I do not have a register
          </Link>
        </form>
      </section>

      <img src={herosImg} alt="Heroes" />
    </Container>
  );
}
