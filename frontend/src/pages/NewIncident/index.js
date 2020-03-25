import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import { Container } from './styles';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewIncidente(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (error) {
      alert('something went wrong');
    }
  }

  return (
    <Container>
      <main>
        <section>
          <img src={logo} alt="Be the Hero" />

          <h1>Register new case</h1>
          <p>Describe the case in detail to find a hero to solve this.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Go Back Home
          </Link>
        </section>

        <form>
          <input
            placeholder="Case Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Value in pounds"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="submit" className="button" onClick={handleNewIncidente}>
            Register
          </button>
        </form>
      </main>
    </Container>
  );
}
