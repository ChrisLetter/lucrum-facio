import { Flex, Box, Button, Text, Heading } from '@chakra-ui/react';
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
  const [pieChartStats, setPieChartStats] = useState([]);
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
        console.log(dataPieChart);
      };
      aggregate();
    }
  }, [holdings]);

  const Pie = () => {
    return (
      <ResponsivePie
        data={pieChartStats}
        margin={{ top: 40, right: 80, bottom: 60, left: 80 }}
        innerRadius={0.4}
        padAngle={1}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#000"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#000',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
          },
        ]}
      />
    );
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
        Portfolio
      </Heading>
      <Flex direction="row">
        <Box height="60vh" width="100vh">
          <Pie />
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
          <Button
            color="white"
            backgroundColor="blue.300"
            boxShadow="md"
            onClick={goToNewCrypto}
          >
            Add New Crypto
          </Button>
        </Flex>
      </Flex>
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
