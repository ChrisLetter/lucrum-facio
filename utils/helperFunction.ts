import { IHolding } from './../interfaces/interfaces';
export const helperFunctions: { [key: string]: any } = {};

helperFunctions.aggregate = function (holdings: IHolding[]) {
  console.log(holdings);
};
