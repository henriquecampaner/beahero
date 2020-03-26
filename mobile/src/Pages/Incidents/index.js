import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import {
  Container,
  Logo,
  Header,
  HeaderText,
  TextBold,
  Title,
  Description,
  IncidentList,
  Incident,
  IncidentProperty,
  IncidentValue,
  DetailsButton,
  ButtonText,
} from './styles';

export default function Incidents() {
  const { navigate } = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page },
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  console.log(incidents);

  return (
    <Container>
      <Header>
        <Logo source={logo} />
        <HeaderText>
          total of <TextBold>{total} cases</TextBold>
        </HeaderText>
      </Header>

      <Title>Welcome</Title>
      <Description>Choose one of the cases below and save the day</Description>

      <IncidentList
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        // showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.5}
        renderItem={({ item: incident }) => (
          <Incident>
            <IncidentProperty>ONG: </IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>Case: </IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>Value: </IncidentProperty>
            <IncidentValue>
              {Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP',
              }).format(incident.value)}
            </IncidentValue>

            <DetailsButton onPress={() => navigateToDetail(incident)}>
              <ButtonText>View Details</ButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailsButton>
          </Incident>
        )}
      />
    </Container>
  );
}
