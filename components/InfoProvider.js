import React, { createContext } from "react";
const ContextAuth = createContext();
//import * as firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pesquisa } from '../services/pesquisa';
export default ContextAuth;
const LIST_NAME="signo.lista";
const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
            isLoading: false,
          };
        case "SIGN_IN":
          //console.log('action.user', action.user)
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
        case "FETCHING_URL_START":
          console.log("FETCHING_URL_START", action);
          return {
            ...prevState,
            isLoading: true,
            info: undefined
          };

        case "FETCHING_URL_END":
          console.log("FETCHING_URL_END", action);
          let listTemp = [ ...prevState.lista ];
          if (action.payload.signo) {
            listTemp = [ ...listTemp, action.payload ];
            AsyncStorage.setItem(LIST_NAME, JSON.stringify(listTemp));
          }
          return {
            ...prevState,
            isLoading: false,
            info: action.payload,
            lista: listTemp
          }
          
        case "LOAD_LIST":
          return {
            ...prevState,
            lista: action.payload
          };
      }
    },
    {
      isLoading: false,
      isSignout: true,
      user: {},
      userToken: null,
      info: undefined,
      lista: []
    }
  );

  const listenerUser = async (user) => {
    if (!user) return;
    console.log("onChangeUser", user);
    const token = await user.getIdToken();
    if (user) {
      dispatch({ type: "SIGN_IN", user: user });
    }
  };

  /*
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    console.log("setting onChangeUser");
    const bootstrapAsync = async () => {
      firebase.auth().onAuthStateChanged(listenerUser);
    };
    bootstrapAsync();
  }, []);
  */


  const action = React.useMemo(() => ({
    signIn: async ({ email, password }) => {
      ///console.log('signIn:', email, password)
/*
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (result) =>
          dispatch({ type: "SIGN_IN", user: result.user })
        );
        */
    },
    signOut: async () => {
      /*return firebase
        .auth()
        .signOut()
        .then(async () => dispatch({ type: "SIGN_OUT" }));*/
    },
    signUp: async ({ email, password }) => {
      /*return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) =>
          dispatch({ type: "SIGN_IN", user: result.user })
        );*/
    },
    fechingURL: async (url, token) => {
      dispatch({ type: "FETCHING_URL_START" })
      pesquisa(url)
        .then(result => dispatch({ type: "FETCHING_URL_END", payload: result }))
    },
    
    
    loadList:async () => {
      const item = await AsyncStorage.getItem(LIST_NAME);
      try {
        dispatch({ type: "LOAD_LIST", payload: JSON.parse(item) })

      } catch (error) {
        console.error(error);
      }
    }

  }));
  return (
    <ContextAuth.Provider value={{ action, state }}>
      {children}
    </ContextAuth.Provider>
  );
};

export { AuthProvider };
