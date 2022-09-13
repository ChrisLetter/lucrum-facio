import { Flex, Box, Button, Text, Heading, Icon } from '@chakra-ui/react';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { helperFunctions } from '../util/helper-function';
import {
  IHoldingsProp,
  IUserInfo,
  IAggregateHoldingsResult,
} from '../interfaces/interfaces';
import PieChart from '../components/PieChart';
import { FiLogOut } from 'react-icons/fi';

const DashBoard = ({ holdings }: IHoldingsProp) => {
  const router = useRouter();
  const [netWorth, setNetWorth] = useState('');
  const [usdApyEstimate, setUsdApyEstimate] = useState('');
  const [totalApy, setTotalApy] = useState('');
  const [pieChartStats, setPieChartStats] = useState([
    { id: '', label: '', value: 0 },
  ]);
  function openAddPositionPage() {
    router.push('/add-position');
  }
  function openPortfolio() {
    router.push('/portfolio');
  }
  function openNoRecords() {
    router.push('/no-records');
  }

  function logout() {
    router.push('/');
  }

  useEffect(() => {
    if (holdings?.length) {
      helperFunctions
        .aggregate(holdings)
        .then((results: IAggregateHoldingsResult) => {
          const { usdNetWorth, usdApyEstimate, totalApy, dataPieChart } =
            results;
          setNetWorth(usdNetWorth);
          setUsdApyEstimate(usdApyEstimate);
          setTotalApy(totalApy);
          setPieChartStats(dataPieChart);
        });
    } else {
      openNoRecords();
    }
  }, [holdings]);

  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="95vh"
      bg="white"
      color="black"
      direction="column"
    >
      <Heading as="h1" size="2xl">
        Portfolio
      </Heading>
      <Flex direction="row">
        <Box height="60vh" width="50vw">
          <PieChart data={pieChartStats} />
        </Box>
        <Flex
          width="50vw"
          align="center"
          direction="column"
          justifyContent="space-evenly"
        >
          <Flex direction="column" align="center">
            <Text>Total net worth: &nbsp;</Text>
            <Heading as="h4" size="lg">
              {netWorth} $
            </Heading>
          </Flex>
          <Flex direction="column" align="center">
            <Text>Total estimated apy: &nbsp;</Text>
            <Heading as="h4" size="lg">
              {totalApy} %
            </Heading>
          </Flex>
          <Flex direction="column" align="center">
            <Text>At current prices, you will earn: &nbsp;</Text>
            <Heading as="h4" size="lg">
              {usdApyEstimate} $/year
            </Heading>
          </Flex>
          <Flex>
            <Button
              color="white"
              backgroundColor="blue.300"
              boxShadow="md"
              onClick={openAddPositionPage}
              mr="1vw"
            >
              Add Position
            </Button>
            <Button
              color="white"
              backgroundColor="blue.300"
              boxShadow="md"
              onClick={openPortfolio}
            >
              Manage Portfolio
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Icon
        as={FiLogOut}
        w={8}
        h={8}
        pos="absolute"
        top="5"
        right="5"
        sx={{ cursor: 'pointer' }}
        onClick={logout}
      />
    </Flex>
  );
};

const mapStateToProps = (state: IUserInfo) => {
  return {
    username: state.username,
    holdings: state.holdings,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(DashBoard);
