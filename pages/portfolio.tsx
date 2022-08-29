import React from 'react';
import { Flex, Box, Button, Text, Heading, Icon } from '@chakra-ui/react';
import { v4 } from 'uuid';

import { connect } from 'react-redux';
import {
  IHoldingsProp,
  IUserInfo,
  IHoldingsGroupedByCrypto,
} from '../interfaces/interfaces';
import HoldingsGroupedByCrypto from '../components/HoldingsGroupedByCrypto';

function Portfolio({ holdings }: IHoldingsProp) {
  const holdingsGroupedByCrypto: IHoldingsGroupedByCrypto = {};
  holdings.forEach((holding) => {
    if (holding.cryptoId) {
      const { cryptoId } = holding;
      if (holdingsGroupedByCrypto[cryptoId]) {
        holdingsGroupedByCrypto[cryptoId].push(holding);
      } else {
        holdingsGroupedByCrypto[cryptoId] = [holding];
      }
    }
  });
  const cryptoAvailable = Object.keys(holdingsGroupedByCrypto);
  return (
    <Flex direction="column" width="100vw" align="center">
      <Heading pt={10} mb={4}>
        All your holdings
      </Heading>
      {cryptoAvailable.map((crypto) => (
        <Flex direction="column" key={v4()} alignItems="center">
          <Text fontSize="2xl" mt={4} mb={2}>
            {crypto}
          </Text>
          <HoldingsGroupedByCrypto
            holdings={holdingsGroupedByCrypto[crypto]}
          ></HoldingsGroupedByCrypto>
        </Flex>
      ))}
    </Flex>
  );
}

const mapStateToProps = (state: IUserInfo) => {
  return {
    username: state.username,
    holdings: state.holdings,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Portfolio);
