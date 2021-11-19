import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const AddNewCrypto = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
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
      {console.log(token)}

      <Heading as="h1" size="2xl">
        AddNewCrypto
      </Heading>
    </Flex>
  );
};

export default AddNewCrypto;
