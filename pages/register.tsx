import { Flex, Input, Button, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  IRegisterFormValues,
  IRegisterFormErrors,
} from '../interfaces/interfaces';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/apollo-client/mutations';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mutationError, setMutationError] = useState('');

  const [registerUserMutation] = useMutation(REGISTER_USER, {
    onCompleted({ register }) {
      if (register) {
        const username = register.username;
        localStorage.setItem('accessToken', register.token);
        const userInfo = {
          username,
          holdings: [],
        };
        dispatch({
          type: 'AUTHENTICATE_USER',
          payload: { ...userInfo },
        });
        router.push('/dashboard');
      }
    },
    onError(_err) {
      setMutationError('Something went wrong, please try again');
    },
  });

  async function submit(values: IRegisterFormValues) {
    await registerUserMutation({
      variables: {
        registrationInput: {
          email: values.email,
          username: values.username,
          password: values.password,
        },
      },
    });
  }

  return (
    <Flex
      align="center"
      justifyContent="center"
      height="100vh"
      direction="column"
    >
      <Text fontSize="3xl" mb="3vh">
        Create a new account
      </Text>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validate={(values) => {
          const errors: IRegisterFormErrors = {};
          if (!values.email) {
            errors.email = 'Please enter an email';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Please enter a password';
          }
          if (!values.username) {
            errors.username = 'Please enter an username';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          submit(values);
          setSubmitting(false);
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
            <Flex
              direction="column"
              width="30vw"
              align="center"
              color="red.500"
            >
              <Input
                mb="1vh"
                backgroundColor="white"
                color="black"
                name="username"
                placeholder="Username"
                boxShadow="md"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && errors.username}
              <Input
                backgroundColor="white"
                mb="1vh"
                mt="1vh"
                color="black"
                boxShadow="md"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <Input
                backgroundColor="white"
                mb="1vh"
                mt="1vh"
                color="black"
                boxShadow="md"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <Text mb="2vh">
                {errors.password && touched.password && errors.password}
              </Text>
              <Button
                alignSelf="center"
                colorScheme="linkedin"
                boxShadow="md"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
      <Text mt="2vh">{mutationError}</Text>
      <ArrowBackIcon
        w={8}
        h={8}
        pos="absolute"
        top="5"
        left="5"
        sx={{ cursor: 'pointer' }}
        onClick={() => router.push('/')}
      />
    </Flex>
  );
};

export default Register;
