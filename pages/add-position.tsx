import { Flex, Input, Button, Text, Heading, Select } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { GET_COINS, ADD_CRYPTO } from '../graphql/apollo-client/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  ICryptoInfo,
  IAddCryptoFormErrors,
  IAddCryptoFormInput,
} from '../interfaces/interfaces';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

// TODO: remove any

const AddNewPosition = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  const [selection, setSelection] = useState();
  const [errors, setErrors] = useState('');

  useQuery(GET_COINS, {
    onCompleted({ getCoins }) {
      const cryptoSelect = document.querySelector('#crypto-select');
      // workaround needed because the select component doesn't work with async data
      getCoins.forEach((coin: ICryptoInfo) => {
        const option = coin.name;
        const optionEl: HTMLElement = document.createElement('option');
        optionEl.setAttribute('value', option);
        optionEl.innerHTML = option;
        cryptoSelect && cryptoSelect.appendChild(optionEl);
      });
    },
  });

  const [mutateFunction, { data, loading, error }] = useMutation(ADD_CRYPTO, {
    onCompleted({ addCrypto }) {
      if (addCrypto) {
        dispatch({
          type: 'UPDATE_HOLDINGS',
          payload: addCrypto.holdings,
        });
      }
    },
    onError(err: any) {
      console.log(err);
    },
  });

  const handleSelection = (event: any): void => {
    setSelection(event);
  };

  async function submit(values: IAddCryptoFormInput) {
    if (selection) {
      await mutateFunction({
        variables: {
          addCryptoInput: {
            crypto: selection,
            stakingProvider: values.stakingProvider,
            quantity: values.quantity,
            apy: values.apy,
          },
        },
      });
      router.push('/dashboard');
    }
  }

  return (
    <Flex
      align="center"
      justifyContent="center"
      height="100vh"
      bg="white"
      color="black"
      direction="column"
    >
      <ArrowBackIcon
        w={8}
        h={8}
        pos="absolute"
        top="5"
        left="5"
        sx={{ cursor: 'pointer' }}
        onClick={() => router.push('/dashboard')}
      />
      <Heading as="h1" size="xl" pb="10vh">
        Add a new position to your portfolio
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
          backgroundColor="white"
          color="black"
          boxShadow="md"
          id="crypto-select"
          placeholder="Select an option from the dropdown"
          onChange={(event) => handleSelection(event)}
        ></Select>
        <Formik
          initialValues={{ stakingProvider: '', quantity: '', apy: '' }}
          validate={(values) => {
            const errors: IAddCryptoFormErrors = {};
            if (!values.stakingProvider) {
              errors.stakingProvider = 'Enter a staking provider';
            }
            if (!values.quantity) {
              errors.quantity = 'Enter a quantity';
            }
            if (!values.apy) {
              errors.apy = 'Enter an apy';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            submit(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Flex direction="column" width="30vw" align="center">
                <Input
                  mt="2vh"
                  mb="1vh"
                  backgroundColor="white"
                  color="black"
                  name="stakingProvider"
                  placeholder="Staking Provider"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stakingProvider}
                  boxShadow="md"
                />
                {errors.stakingProvider &&
                  touched.stakingProvider &&
                  errors.stakingProvider}
                <Input
                  backgroundColor="white"
                  mb="1vh"
                  mt="1vh"
                  color="black"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity}
                  boxShadow="md"
                />
                {errors.quantity && touched.quantity && errors.quantity}
                <Input
                  backgroundColor="white"
                  mb="1vh"
                  mt="1vh"
                  color="black"
                  placeholder="APY"
                  name="apy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.apy}
                  border="2px solid #000"
                  boxShadow="md"
                />
                <Text mb="2vh">{errors.apy && touched.apy && errors.apy}</Text>
                <Button
                  alignSelf="center"
                  color="white"
                  backgroundColor="blue.300"
                  boxShadow="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  ADD
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default AddNewPosition;
