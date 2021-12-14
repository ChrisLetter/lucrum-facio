import { IHoldingFromDb } from './../interfaces/interfaces';
export const helperFunctions: { [key: string]: any } = {};

helperFunctions.aggregate = function (holdings: IHoldingFromDb[]) {
  const total: any = {};
  console.log(holdings.length);
  for (let el of holdings) {
    !total[el.cryptoId]
      ? (total[el.cryptoId] = Number(el.quantity))
      : (total[el.cryptoId] += Number(el.quantity));
  }
  console.log({ total });
  console.log({ holdings });
};
