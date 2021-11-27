import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const DashBoard = () => {
  const router = useRouter();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  const userInfos = useSelector((state) => {
    return state;
  });

  function goToNewCrypto() {
    router.push('/add-crypto');
  }

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
        Your Holdings
      </Heading>
      <Button colorScheme="blue" onClick={goToNewCrypto}>
        Add New Crypto
      </Button>
    </Flex>
  );
};

export default DashBoard;
