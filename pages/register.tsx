import {
  Flex,
  Input,
  Button,
  Text,
  Heading,
  Box,
  Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { IRegisterFormErrors } from './../interfaces/interfaces';

const Register = () => {
  function sumbit() {
    console.log('here');
  }
  return (
    <Flex
      align="center"
      justifyContent="center"
      height="100vh"
      bg="purple.700"
      color="white"
      direction="column"
    >
      <Text fontSize="2xl" mb="1vh">
        Register a new account
      </Text>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validate={(values) => {
          const errors: IRegisterFormErrors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Enter a password';
          }
          if (!values.username) {
            errors.username = 'Enter a username';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                mb="1vh"
                backgroundColor="white"
                color="black"
                name="username"
                placeholder="Username"
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
                color="black"
                boxShadow="lg"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

export default Register;
