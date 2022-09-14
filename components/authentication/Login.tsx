import { Flex, Input, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  ILoginFormErrors,
  ILoginFormValues,
} from '../../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/apollo-client/mutations';

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mutationError, setMutationError] = useState('');

  const [mutateFunction] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem('accessToken', login.token);
        const { username, holdings, userId } = login;

        const userInfo = {
          username,
          holdings,
          userId,
        };
        dispatch({
          type: 'AUTHENTICATE_USER',
          payload: { ...userInfo },
        });
        holdings.length
          ? router.push('/dashboard')
          : router.push('/no-records');
      }
    },
    onError(_err) {
      setMutationError('Invalid email or password, please try again');
    },
  });

  async function submit(values: ILoginFormValues) {
    await mutateFunction({
      variables: {
        loginInput: {
          email: values.email,
          password: values.password,
        },
      },
    });
  }

  return (
    <Flex direction="column" align="center" color="red.500">
      <Text color="black" fontSize="xl" mb="1vh">
        Enter your credentials
      </Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: ILoginFormErrors = {};
          if (!values.email) {
            errors.email = 'Please enter an email';
          }
          if (values.email && !values.email.includes('@')) {
            errors.email = 'Please enter a valid email';
          }
          if (!values.password) {
            errors.password = 'Please enter a password';
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
            <Flex direction="column" width="30vw" align="center">
              <Input
                backgroundColor="white"
                border="1px solid black"
                boxShadow="md"
                mb="1vh"
                mt="1vh"
                color="black"
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
                boxShadow="md"
                mt="1vh"
                color="black"
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
                Login
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
      <Text mt="2vh">{mutationError}</Text>
    </Flex>
  );
}

export default Login;
