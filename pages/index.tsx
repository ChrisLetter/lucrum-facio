import Head from 'next/head';
import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import Login from './../components/authentication/Login';
import Register from './../components/authentication/Register';

const Home = () => {
  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="100vh"
      bg="purple.700"
      color="white"
      direction="column"
    >
      <Heading as="h1" size="4xl">
        Lucrum Facio
      </Heading>
      <Login />
      <Register />
    </Flex>
  );
};

export default Home;
