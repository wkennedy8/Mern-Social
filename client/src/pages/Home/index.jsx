import React from 'react';
import { Container } from 'react-bootstrap';
import Feed from '../../components/Feed';
import Search from '../../components/Search';

const Home = () => {
  return (
    <Container>
      <Search />
      <Feed />
    </Container>
  );
};

export default Home;
