import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { helperFunctions } from './../utils/helperFunction';
import { IUserInfo } from './../interfaces/interfaces';

const DashBoard = ({ username, holdings }: IUserInfo) => {
  const router = useRouter();

  function goToNewCrypto() {
    router.push('/add-crypto');
  }
  // console.log({ holdings });
  useEffect(() => {
    helperFunctions.aggregate(holdings);
  }, [holdings]);

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
        Your Holdings
      </Heading>
      <Button
        color="white"
        backgroundColor="purple.400"
        boxShadow="md"
        onClick={goToNewCrypto}
      >
        Add New Crypto
      </Button>
    </Flex>
  );
};

const mapStateToProps = (state: IUserInfo) => {
  return {
    username: state.username,
    holdings: state.holdings,
  };
};

export default connect(mapStateToProps)(DashBoard);
