import React from 'react';
import { Container } from 'react-bootstrap';
import Feed from '../components/Feed';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  return (
    <Container>
      <LogoutButton />
      <Feed />
    </Container>
  );
};

export default Home;
