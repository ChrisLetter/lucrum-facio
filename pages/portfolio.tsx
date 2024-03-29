import React from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import {
  IHoldingsProp,
  IUserInfo,
  IHoldingsGroupedByCrypto,
  IHolding,
} from '../interfaces/interfaces';
import HoldingsGroupedByCrypto from '../components/HoldingsGroupedByCrypto';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../util/authentication-hook';

function Portfolio({ holdings }: IHoldingsProp) {
  const router = useRouter();
  if (!isAuthenticated()) {
    router.push('/');
  }
  const holdingsGroupedByCrypto: IHoldingsGroupedByCrypto = {};

  holdings &&
    holdings.forEach((holding: IHolding) => {
      if (holding.cryptoId) {
        const { cryptoId } = holding;
        if (holdingsGroupedByCrypto[cryptoId]) {
          holdingsGroupedByCrypto[cryptoId].push(holding);
        } else {
          holdingsGroupedByCrypto[cryptoId] = [holding];
        }
      }
    });

  if (!holdings || !holdings.length) {
    router.push('/no-records');
  }

  return (
    <Flex direction="column" width="100vw" align="center">
      <Heading pt={10} mb={4}>
        All your holdings
      </Heading>
      {Object.keys(holdingsGroupedByCrypto).map((crypto) => (
        <Flex direction="column" key={v4()} alignItems="center">
          <Text fontSize="2xl" mt={4} mb={2}>
            {crypto[0].toUpperCase() + crypto.slice(1)}
          </Text>
          <HoldingsGroupedByCrypto
            holdings={holdingsGroupedByCrypto[crypto]}
          ></HoldingsGroupedByCrypto>
        </Flex>
      ))}
      <ArrowBackIcon
        w={8}
        h={8}
        pos="absolute"
        top="5"
        left="5"
        sx={{ cursor: 'pointer' }}
        onClick={() => router.push('/dashboard')}
      />
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
