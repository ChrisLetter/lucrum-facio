import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

function RegisterOption() {
  const router = useRouter();

  return (
    <Flex direction="column" align="center">
      <Text fontSize="2xl" mb="1vh" mt="8vh">
        Or create an account
      </Text>
      <Button
        color="black"
        boxShadow="lg"
        onClick={() => router.push('/register')}
      >
        Register
      </Button>
    </Flex>
  );
}

export default RegisterOption;
