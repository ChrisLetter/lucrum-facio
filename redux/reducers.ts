import { IUserInfo } from './../interfaces/interfaces';
import { createNewUserAction } from './actions';

const initialState: IUserInfo = {
  username: '',
  holdings: [],
};

const reducer = (state = initialState, action: createNewUserAction) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return {
        ...state,
        username: action.payload.username,
        holdings: action.payload.holdings,
      };
    default:
      return state;
  }
};

export default reducer;
