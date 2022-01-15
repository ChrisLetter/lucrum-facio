import Head from 'next/head';
import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import Login from './../components/authentication/Login';
import RegisterOption from '../components/authentication/RegisterOption';

const Home = () => {
  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="100vh"
      bg="white"
      color="blue.500"
      direction="column"
    >
      <Heading as="h1" size="4xl">
        Lucrum Facio
      </Heading>
      <Login />
      <RegisterOption />
    </Flex>
  );
};

export default Home;
