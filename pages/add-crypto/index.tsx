import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { GET_COINS } from './../../graphql/apolloClient/mutations';
import { useQuery } from '@apollo/client';
import { ICryptoInfo } from './../../interfaces/interfaces';
import { useState } from 'react';

// TODO: remove any

const AddNewCrypto = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  const userInfos = useSelector((state) => {
    return state;
  });
  const [selection, setSelection] = useState();
  const options: any = [];

  const { data } = useQuery(GET_COINS, {
    onCompleted({ getCoins }) {
      getCoins.forEach((coin: ICryptoInfo) => {
        const option = {
          value: coin.name,
          label: coin.name,
        };
        options.push(option);
      });
    },
  });
  const handleSelection = (event: any): void => {
    setSelection(event);
  };

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
        Add a new position
      </Heading>
      <Flex
        align="center"
        justifyContent="space-evenly"
        width="30vw"
        bg="white"
        color="black"
        direction="column"
      >
        <Select
          value={selection}
          onChange={(event) => handleSelection(event)}
          options={options}
          placeholder={'Select crypto'}
        />
      </Flex>
    </Flex>
  );
};

export default AddNewCrypto;
