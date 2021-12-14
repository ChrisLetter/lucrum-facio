import { IHoldingFromDb } from './../interfaces/interfaces';
export const helperFunctions: { [key: string]: any } = {};

helperFunctions.aggregate = async function (holdings: IHoldingFromDb[]) {
  const total: any = {};
  for (let el of holdings) {
    !total[el.cryptoId]
      ? (total[el.cryptoId] = Number(el.quantity))
      : (total[el.cryptoId] += Number(el.quantity));
  }
  const whichCoins = whichCoinsPriceToQuery(total);
  const prices = await retrievePrices(whichCoins);
  console.log({ prices });

  console.log({ total });
  console.log({ holdings });
};

function whichCoinsPriceToQuery(totalHoldings: { [key: string]: number }) {
  const coins = [];
  for (let el in totalHoldings) {
    coins.push(el);
  }
  return coins.join(',');
}

async function retrievePrices(coins: string) {
  const prices: { [key: string]: any } = {};
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`,
  );
  const json = await res.json();
  for (let el in json) {
    prices[el] = json[el].usd;
  }
  return prices;
}
