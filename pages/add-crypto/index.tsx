import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { GET_COINS, ADD_CRYPTO } from './../../graphql/apolloClient/mutations';
import { useQuery, useMutation } from '@apollo/client';

import {
  ICryptoInfo,
  IAddCryptoFormErrors,
  IAddCryptoFormInput,
} from './../../interfaces/interfaces';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

// TODO: remove any

const AddNewCrypto = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  const userInfos = useSelector((state) => {
    return state;
  });
  const [selection, setSelection] = useState();
  const options: any = [];
  const [errors, setErrors] = useState('');

  useQuery(GET_COINS, {
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

  const [mutateFunction, { data, loading, error }] = useMutation(ADD_CRYPTO, {
    onCompleted({ addCrypto }) {
      if (addCrypto) {
        console.log(addCrypto.response);
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
      const { value } = selection;
      await mutateFunction({
        variables: {
          addCryptoInput: {
            crypto: value,
            stakingProvider: values.stakingProvider,
            quantity: values.quantity,
            apy: values.apy,
          },
        },
      });
    }
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
      <Heading as="h1" size="xl">
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
          placeholder={'Select crypto from the dropdown menu'}
        />
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
                />
                <Text mb="2vh">{errors.apy && touched.apy && errors.apy}</Text>
                <Button
                  alignSelf="center"
                  color="white"
                  backgroundColor="purple.300"
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

export default AddNewCrypto;
