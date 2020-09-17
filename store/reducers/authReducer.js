import {authType} from "../actions/authActions";
const initialState = {
  isUserLoggedIn: false,
  authData: {},
  user: {
    userId: null,
    token: null,
  },
};

const authReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case authType.LOGIN: {
      let token = action.payload.idToken;
      let userId = action.payload.localId;

      // console.log(action);
      return {...state, user: {userId, token}, isUserLoggedIn: true};
    }
    case authType.SIGNUP: {
      let token = action.payload.idToken;
      let userId = action.payload.localId;
      // console.log(userId, token);

      return {...state, user: {userId, token}};
    }
    case authType.LOAD_AUTH: {
      let token = action.payload.idToken;
      let userId = action.payload.localId;

      // console.log(action);
      return {...state, user: {userId, token}, isUserLoggedIn: true};
    }
    case authType.LOGOUT: {
      console.log("logout");
      return initialState;
    }
    default:
      return state;
  }
};

export default authReducer;
