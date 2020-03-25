import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import { Container } from './styles';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getIncidents() {
      const { data } = await api.get('profile', {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(data);
    }
    getIncidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert('Something went wrong');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="Be the Hero" />
        <span>Welcome, {ongName}</span>

        <Link to="/incident/new" className="button">
          Add new case
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Registered cases</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Case: </strong>
            <p>{incident.title}</p>

            <strong>Description: </strong>
            <p>{incident.description}</p>

            <strong>Value: </strong>
            <p>
              {Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP',
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
