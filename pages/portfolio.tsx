import React from 'react';
import { Flex, Box, Button, Text, Heading } from '@chakra-ui/react';
import { uuid } from 'uuidv4';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { connect } from 'react-redux';
import { IUserInfo } from './../interfaces/interfaces';

function Portfolio({ username, holdings }: IUserInfo) {
  return (
    <Flex direction="column" width="100vw" align="center">
      {console.log(holdings)}
      <Heading py={6}>All your holdings</Heading>
      {holdings.map((holding) => (
        <Box
          key={uuid()}
          width="60vh"
          boxShadow="md"
          rounded="md"
          align="center"
          p={3}
          m={2}
          backgroundColor="blue.100"
        >
          <Flex direction="row" justifyContent="space-between">
            <Flex direction="column" pl={10}>
              <Heading as="h2" size="md">
                {holding.quantity +
                  ' ' +
                  holding.cryptoId +
                  ' - ' +
                  holding.location}
              </Heading>
              <Heading as="h2" size="md">
                {holding.apy} %
              </Heading>
            </Flex>
            <Flex direction="column">
              <DeleteIcon />
              <EditIcon />
            </Flex>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}

const mapStateToProps = (state: IUserInfo) => {
  return {
    username: state.username,
    holdings: state.holdings,
  };
};

export default connect(mapStateToProps)(Portfolio);
