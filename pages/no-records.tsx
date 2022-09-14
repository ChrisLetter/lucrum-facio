import { Flex, Button, Heading, Icon } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

function NoRecords() {
  const router = useRouter();
  const dispatch = useDispatch();

  function openAddPositionPage() {
    router.push('/add-position');
  }

  function logout() {
    localStorage.removeItem('accessToken');
    dispatch({
      type: 'LOGOUT_USER',
      payload: {},
    });
    router.push('/');
  }

  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="100vh"
      direction="column"
    >
      <Heading as="h1" size="2xl">
        Welcome!
      </Heading>
      <Heading as="h3" size="lg">
        You have no crypto positions yet. Click the button below to add one.
      </Heading>
      <Button
        colorScheme="linkedin"
        boxShadow="md"
        onClick={openAddPositionPage}
        mr="1vw"
      >
        Add Position
      </Button>
      <Icon
        as={FiLogOut}
        w={8}
        h={8}
        pos="absolute"
        top="5"
        right="5"
        sx={{ cursor: 'pointer' }}
        onClick={logout}
      />
    </Flex>
  );
}

export default NoRecords;
