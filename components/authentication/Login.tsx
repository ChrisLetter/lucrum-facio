import {
  Flex,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import {
  ILoginFormErrors,
  ILoginFormValues,
} from './../../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './../../graphql/apolloClient/mutations';

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const [mutateFunction, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem('accessToken', login.token);
        const username = login.username;
        const holdings = login.holdings;
        const userInfo = {
          username,
          holdings,
        };
        // I set the holdings to an empty array since this is a new user
        dispatch({
          type: 'AUTHENTICATE_USER',
          payload: { ...userInfo },
        });
        router.push('/dashboard');
      }
    },
    onError(err: any) {
      setErrors('Invalid email or password, please try again');
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
    <Flex direction="column" align="center">
      <Text color="black" fontSize="xl" mb="1vh">
        Enter your credentials
      </Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: ILoginFormErrors = {};
          if (!values.email) {
            errors.email = 'Enter an email';
          }
          if (!values.password) {
            errors.password = 'Enter a password';
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
                backgroundColor="purple.400"
                color="white"
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
      {errors}
    </Flex>
  );
}

export default Login;
