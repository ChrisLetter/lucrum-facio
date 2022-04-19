import React from 'react';
import { Flex, Box, Button, Text, Heading } from '@chakra-ui/react';
import Holding from '../components/Holding';
import { uuid } from 'uuidv4';

import { connect } from 'react-redux';
import { IUserInfo } from './../interfaces/interfaces';

function Portfolio({ username, holdings }: IUserInfo) {
  return (
    <Flex direction="column">
      <Heading>All your holdings</Heading>ß
      {holdings.map((holding) => (
        <Holding key={uuid()} holdings={holding} />
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
