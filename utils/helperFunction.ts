import { IUserInfo } from './../interfaces/interfaces';
export const helperFunctions: { [key: string]: any } = {};

helperFunctions.aggregate = function (userInfo: IUserInfo) {
  console.log(userInfo.holdings);
};
