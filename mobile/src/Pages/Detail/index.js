import React from 'react';
import { Linking } from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import logo from '../../assets/logo.png';
import {
  Container,
  Header,
  Logo,
  IconContainer,
  Incident,
  IncidentProperty,
  IncidentValue,
  ContactBox,
  HeroTitle,
  HeroDescription,
  Actions,
  ActionButton,
  ActionText,
} from './styles';

export default function Detail() {
  const route = useRoute();
  const { incident } = route.params;
  const navigation = useNavigation();
  const message = `Hello ${
    incident.name
  }, I am contacting you because I would like to help in the case "${
    incident.title
  }" with a value of ${Intl.NumberFormat('en-gb', {
    style: 'currency',
    currency: 'GBP',
  }).format(incident.value)}.`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }
  return (
    <Container>
      <Header>
        <Logo source={logo} />
        <IconContainer onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </IconContainer>
      </Header>

      <Incident>
        <IncidentProperty style={{ marginTop: 0 }}>ONG: </IncidentProperty>
        <IncidentValue>
          {incident.name} from {incident.city}/{incident.country}
        </IncidentValue>

        <IncidentProperty>Case: </IncidentProperty>
        <IncidentValue>{incident.description}</IncidentValue>

        <IncidentProperty>Value: </IncidentProperty>
        <IncidentValue>
          {Intl.NumberFormat('en-gb', {
            style: 'currency',
            currency: 'GBP',
          }).format(incident.value)}
        </IncidentValue>
      </Incident>

      <ContactBox>
        <HeroTitle>Save the day!</HeroTitle>
        <HeroTitle>Be the hero of this case.</HeroTitle>

        <HeroDescription>Contact</HeroDescription>

        <Actions>
          <ActionButton onPress={sendWhatsapp}>
            <ActionText>WhatsApp</ActionText>
          </ActionButton>

          <ActionButton onPress={sendMail}>
            <ActionText>Email</ActionText>
          </ActionButton>
        </Actions>
      </ContactBox>
    </Container>
  );
}
