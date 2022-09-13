import { IUserInfo } from './../interfaces/interfaces';
import { createNewUserAction, updateHoldings } from './actions';

const initialState: IUserInfo = {
  username: '',
  holdings: [],
  userId: 0,
};

const reducer = (
  state = initialState,
  action: createNewUserAction | updateHoldings,
) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return {
        ...state,
        username: action.payload.username,
        holdings: action.payload.holdings,
        userId: action.payload.userId,
      };
    case 'UPDATE_HOLDINGS':
      return {
        ...state,
        holdings: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
