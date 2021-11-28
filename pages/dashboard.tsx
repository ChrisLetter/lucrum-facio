import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { helperFunctions } from './../utils/helperFunction';

const DashBoard = () => {
  const router = useRouter();
  const userInfos = useSelector((state) => {
    return state;
  });

  function goToNewCrypto() {
    router.push('/add-crypto');
  }

  useEffect(() => {
    helperFunctions.aggregate(userInfos);
  }, [userInfos]);

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
