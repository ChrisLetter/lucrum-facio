import { Flex, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

function NoRecords() {
  const router = useRouter();
  function openAddPositionPage() {
    router.push('/add-position');
  }

  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="100vh"
      bg="white"
      color="black"
      direction="column"
    >
      <Heading as="h1" size="2xl">
        Welcome!
      </Heading>
      <Heading as="h3" size="lg">
        You have no crypto positions yet. Click the button below to add one.
      </Heading>
      <Button
        color="white"
        backgroundColor="blue.300"
        boxShadow="md"
        onClick={openAddPositionPage}
        mr="1vw"
      >
        Add Position
      </Button>
    </Flex>
  );
}

export default NoRecords;
