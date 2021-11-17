import {
  Flex,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Flex
      direction="column"
      align="center"
    >
      <Text fontSize="2xl" mb="1vh">
        Login
      </Text>
      <Input
        backgroundColor="white"
        color="black"
        placeholder="Email"
        size="md"
        mb="1vh"
      />
      <InputGroup
        backgroundColor="white"
        borderRadius="lg"
        color="black"
        size="md"
        direction="column"
        mb="1vh"
      >
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button
            color="white"
            h="1.75rem"
            size="sm"
            backgroundColor="purple.700"
            onClick={handleClick}
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button color="black" boxShadow="lg" onClick={() => console.log('test')}>
        Login
      </Button>
    </Flex>
  );
}

export default Login;
