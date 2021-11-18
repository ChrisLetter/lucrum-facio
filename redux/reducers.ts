import { IUserInfo } from './../interfaces/interfaces';
import { createNewUserAction } from './actions';

const initialState: IUserInfo = {
  username: '',
  accessToken: '',
  holdings: [],
};

const reducer = (state = initialState, action: createNewUserAction) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return {
        ...state,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
        holdings: action.payload.holdings,
      };
    default:
      return state;
  }
};

export default reducer;
