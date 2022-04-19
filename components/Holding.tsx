import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { IHolding } from '../interfaces/interfaces';
import React from 'react';

function Holding({ holdings }: IHolding) {
  return (
    <Flex direction="column" align="center">
      <Text color="black" fontSize="xl" mb="1vh" mt="8vh">
        Or create an account
      </Text>
      <Text color="black" fontSize="xl" mb="1vh" mt="8vh">
        holdings.apy
      </Text>
    </Flex>
  );
}

export default Holding;
