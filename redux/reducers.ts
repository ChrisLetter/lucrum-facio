import { IUserInfo } from '../interfaces/interfaces';
import { createNewUserAction, logout, updateHoldings } from './actions';

const initialState: IUserInfo = {
  username: '',
  holdings: [],
  userId: 0,
};

const reducer = (
  state = initialState,
  action: createNewUserAction | updateHoldings | logout,
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
    case 'LOGOUT_USER':
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default reducer;
