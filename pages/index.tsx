import { Flex, Heading } from '@chakra-ui/react';
import Login from './../components/authentication/Login';
import RegisterOption from '../components/authentication/RegisterOption';

const Home = () => {
  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="100vh"
      bg="white"
      direction="column"
    >
      <Heading color="blue.500" as="h1" size="4xl">
        Lucrum Facio
      </Heading>
      <Login />
      <RegisterOption />
    </Flex>
  );
};

export default Home;
