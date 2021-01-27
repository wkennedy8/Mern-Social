import React from 'react';
import { Container } from 'react-bootstrap';
import Feed from '../../components/Feed';
import Search from '../../components/Search';
import LogoutButton from '../../components/LogoutButton';

const Home = () => {
  return (
    <Container>
      <LogoutButton />
      <Search />
      <Feed />
    </Container>
  );
};

export default Home;
