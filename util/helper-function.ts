import { IHoldingFromDb } from './../interfaces/interfaces';
export const helperFunctions: { [key: string]: any } = {};

helperFunctions.aggregate = async function (holdings: IHoldingFromDb[]) {
  const sumHoldings = sumAllHoldings(holdings);
  const sumApy = sumAllApy(holdings);
  const whichCoins = whichCoinsPriceToQuery(sumHoldings);
  const prices = await retrievePrices(whichCoins);
  const usdNetWorth = calculateTotalUsdValue(sumHoldings, prices);
  const usdApyEstimate = calculateTotalUsdValue(sumApy, prices);
  const totalApy = calculateTotalApy(usdNetWorth, usdApyEstimate);
  const usdSingularCrypto = calculateSingleUsdValue(sumHoldings, prices);
  const dataPieChart = produceDataForPieChart(usdSingularCrypto);
  return { usdNetWorth, usdApyEstimate, totalApy, dataPieChart };
};

function sumAllHoldings(holdings: IHoldingFromDb[]) {
  const total: any = {};
  for (let el of holdings) {
    !total[el.cryptoId]
      ? (total[el.cryptoId] = Number(el.quantity))
      : (total[el.cryptoId] += Number(el.quantity));
  }
  return total;
}

function whichCoinsPriceToQuery(totalHoldings: { [key: string]: number }) {
  const coins = [];
  for (let el in totalHoldings) {
    coins.push(el);
  }
  return coins.join(',');
}

async function retrievePrices(coins: string) {
  const coinsArray = coins.split(',');
  const prices: { [key: string]: any } = {};
  const time = await localStorage.getItem('time');
  const now = new Date().getTime().toString();
  const cachedPrices = await localStorage.getItem('prices');
  const coinsCached = cachedPrices ? Object.keys(JSON.parse(cachedPrices)) : [];

  const isCoinPriceMissing: boolean = coinsArray.some(
    (el) => !coinsCached.includes(el),
  );

  if (
    time === null ||
    Number(now) - Number(time) > 300000 ||
    isCoinPriceMissing
  ) {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`,
    );
    const json = await res.json();
    for (let el in json) {
      prices[el] = json[el].usd;
    }
    localStorage.setItem('prices', JSON.stringify(prices));
    localStorage.setItem('time', now);
    return prices;
  } else {
    if (cachedPrices) return JSON.parse(cachedPrices);
  }
}

function calculateTotalUsdValue(
  holdings: { [key: string]: number },
  prices: { [key: string]: number },
) {
  let total = 0;
  for (let el in holdings) {
    total += holdings[el] * prices[el];
  }
  return total.toFixed(2);
}

function calculateSingleUsdValue(
  holdings: { [key: string]: number },
  prices: { [key: string]: number },
) {
  const res: { [key: string]: string } = {};
  for (let el in holdings) {
    res[el] = (holdings[el] * prices[el]).toFixed(2);
  }
  return res;
}

function sumAllApy(holdings: IHoldingFromDb[]) {
  const totalApy: any = {};
  for (let el of holdings) {
    !totalApy[el.cryptoId]
      ? (totalApy[el.cryptoId] = Number(el.quantity) * (Number(el.apy) / 100))
      : (totalApy[el.cryptoId] += Number(el.quantity) * (Number(el.apy) / 100));
  }
  return totalApy;
}

function calculateTotalApy(netWorth: string, apy: string) {
  return ((Number(apy) / Number(netWorth)) * 100).toFixed(2).toString();
}

function produceDataForPieChart(cryptoAmounts: { [key: string]: string }) {
  const data = [];
  for (let el in cryptoAmounts) {
    data.push({
      id: el,
      label: el,
      value: Number(cryptoAmounts[el]),
    });
  }
  return data;
}
