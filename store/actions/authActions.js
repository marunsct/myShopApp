import AsyncStorage from "@react-native-community/async-storage";
export const authType = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  LOAD_AUTH: "LOAD_AUTH",
  LOGOUT: "LOGOUT",
};
let timer;
export const authActions = {
  login: (data) => {
    try {
      return async (dispatch) => {
        //.log("in", data);
        let response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWwot8Mn1PJbAwwRUYstp7jQBSw-lhAcc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.userName,
              password: data.password,
              returnSecureToken: true,
            }),
          }
        );

        let resData = await response.json();
        //console.log(resData);
        let message;
        if (!response.ok) {
          switch (resData.error.message) {
            case "EMAIL_NOT_FOUND":
              message = "Email address was not found. Please create a new account";
              break;
            case "INVALID_PASSWORD":
              message = "The password is invalid please check.";
              break;
            case "USER_DISABLED":
              message = "The user account has been disabled by an administrator.";
              break;
            default:
              //console.log(resData.error.message);
              message = "Error while logging in. Try again later.";
          }
          throw new Error(message);
        }

        let expiryTime = new Date(
          new Date().getTime() + parseInt(resData.expiresIn) * 1000
        ).toISOString();
        saveAuthData(resData.localId, resData.idToken, expiryTime);
        dispatch(setLogOutTimer(expiryTime / 100000));
        dispatch({type: authType.LOGIN, payload: resData});
      };
    } catch (err) {
      throw err;
    }
  },
  logOut: async () => {
    clearLogOutTimer();
    AsyncStorage.removeItem("AuthData");
    return {type: authType.LOGOUT};
    /*
    return async (dispatch) => {
      clearLogOutTimer();
      console.log("executing timer");
      AsyncStorage.removeItem("AuthData");
      await dispatch({type: authType.LOGOUT});
    };
    */
  },
  signUp: (data) => {
    try {
      return async (dispatch) => {
        //console.log(2, "SignUp", data);
        let response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWwot8Mn1PJbAwwRUYstp7jQBSw-lhAcc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.userName,
              password: data.password,
              returnSecureToken: true,
            }),
          }
        );
        let resData = await response.json();
        //console.log(resData);
        let message;
        if (!response.ok) {
          switch (resData.error.message) {
            case "EMAIL_EXISTS":
              message = "The email address is already in use by another account.";
              break;
            case "OPERATION_NOT_ALLOWED":
              message = "Password sign-in is disabled for this application";
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              message =
                "We have blocked all requests from this device due to unusual activity. Try again later.";
              break;
            default:
              message = "Error occurred while creating a new user account.";
          }
          throw new Error(message);
        }

        //let resData = await response.json();
        dispatch({type: authType.SIGNUP, payload: resData});
      };
    } catch (err) {
      throw err;
    }
  },
  loadAuthData: (data) => {
    let remTime = new Date(data.expiryTime).getTime() - new Date().getTime();
    console.log(remTime / 100);
    setLogOutTimer(Math.ceil(remTime / 100));
    return {
      type: authType.LOAD_AUTH,
      payload: data,
    };
  },
};

const saveAuthData = async (localId, idToken, expiryTime) => {
  try {
    const jsonValue = JSON.stringify({localId, idToken, expiryTime});
    await AsyncStorage.setItem("AuthData", jsonValue);
  } catch (err) {
    throw err;
  }
};

const setLogOutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const clearLogOutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
