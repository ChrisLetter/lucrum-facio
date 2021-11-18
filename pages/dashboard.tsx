import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const DashBoard = () => {
  const userInfos = useSelector((state) => {
    return state;
  });

  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="100vh"
      bg="purple.700"
      color="white"
      direction="column"
    >
      {console.log(userInfos)}
      <Heading as="h1" size="4xl">
        Lucrum Facio
      </Heading>
    </Flex>
  );
};

export default DashBoard;
