import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import { Container } from './styles';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const data = { name, email, whatsapp, city, country };

      const response = await api.post('ongs', data);

      alert(`Your Id is ${response.data.id}`);

      history.push('/');
    } catch (error) {
      alert('Something went wrong');
    }
  }

  return (
    <Container>
      <main>
        <section>
          <img src={logo} alt="Be the Hero" />

          <h1>Register</h1>
          <p>
            Make your registration, enter the platform and help people find the
            cases of your NGO.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />I have a register
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div>
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button type="submit" className="button">
            Register
          </button>
        </form>
      </main>
    </Container>
  );
}
