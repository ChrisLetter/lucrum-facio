import { Flex, Input, Button, Text, Heading } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { helperFunctions } from './../utils/helperFunction';
import { IUserInfo } from './../interfaces/interfaces';
import { ResponsivePie } from '@nivo/pie';

const DashBoard = ({ username, holdings }: IUserInfo) => {
  const router = useRouter();
  const [netWorth, setNetWorth] = useState('');
  const [usdApyEstimate, setUsdApyEstimate] = useState('');
  const [totalApy, setTotalApy] = useState('');
  const [pieChartStats, setPieChartStats] = useState(null);
  function goToNewCrypto() {
    router.push('/add-crypto');
  }

  useEffect(() => {
    if (holdings.length) {
      const aggregate = async function () {
        const { usdNetWorth, usdApyEstimate, totalApy, dataPieChart } =
          await helperFunctions.aggregate(holdings);
        setNetWorth(usdNetWorth);
        setUsdApyEstimate(usdApyEstimate);
        setTotalApy(totalApy);
        setPieChartStats(dataPieChart);
      };
      aggregate();
    }
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
      <Text>Your net worth: {netWorth} $</Text>
      <Text>Your estimate apy: {totalApy} %</Text>
      <Text>You will earn: {usdApyEstimate} $</Text>
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
