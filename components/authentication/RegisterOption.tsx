import { Flex, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

function RegisterOption() {
  const router = useRouter();

  return (
    <Flex direction="column" align="center">
      <Text color="black" fontSize="xl" mb="1vh" mt="8vh">
        Don&#39;t have an account?
      </Text>
      <Button
        alignSelf="center"
        colorScheme="linkedin"
        boxShadow="md"
        onClick={() => router.push('/register')}
      >
        Register
      </Button>
    </Flex>
  );
}

export default RegisterOption;
