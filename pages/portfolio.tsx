import React from 'react';
import { Flex, Box, Button, Text, Heading } from '@chakra-ui/react';

import { connect } from 'react-redux';
import { IUserInfo } from './../interfaces/interfaces';

function Portfolio({ username, holdings }: IUserInfo) {
  return (
    <Flex direction="column">
      {console.log(holdings)}
      <Heading>Portfolio</Heading>
      {holdings.map((holding) => (
        <Flex key={holding.quantity + holding.apy + holding.location}>
          {holding.cryptoId}
          {holding.quantity}
          {holding.apy}
          {holding.location}
        </Flex>
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
