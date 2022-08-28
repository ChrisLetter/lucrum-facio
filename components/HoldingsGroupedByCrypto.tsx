import { Flex, Text, Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { v4 } from 'uuid';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { AiFillBank } from 'react-icons/ai';
import { GrGrow } from 'react-icons/gr';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { IHoldingsProp } from '../interfaces/interfaces';

function HoldingsGroupedByCrypto({ holdings }: IHoldingsProp) {
  return (
    <Flex direction="column">
      {holdings.map((holding) => (
        <Box
          key={v4()}
          width="35vw"
          boxShadow="md"
          rounded="md"
          align="center"
          p={3}
          m={2}
          backgroundColor="blue.200"
        >
          <Flex direction="row" justifyContent="space-between">
            <Flex direction="column" pl={5}>
              <Flex direction="row" alignItems="center">
                <Icon as={BsCurrencyBitcoin} />
                <Text pl={2}>{holding.quantity + ' ' + holding.cryptoId}</Text>
              </Flex>
              <Flex direction="row" alignItems="center">
                <Icon as={AiFillBank} />
                <Text pl={2}>{holding.location}</Text>
              </Flex>
              <Flex direction="row" alignItems="center">
                <Icon as={GrGrow} />
                <Text pl={2}>{holding.apy} %</Text>
              </Flex>
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

export default HoldingsGroupedByCrypto;
