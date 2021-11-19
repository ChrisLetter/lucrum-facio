import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const AddNewCryptoDetails = () => {
  const router = useRouter();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  const userInfos = useSelector((state) => {
    return state;
  });
  const { crypto } = router.query;
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
        {crypto}
      </Heading>
    </Flex>
  );
};

export default AddNewCryptoDetails;
