import React, { createContext, useContext } from 'react';
const ContextAuth = createContext();
//import * as firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pesquisa, sugestao } from '../services/pesquisa';
export default ContextAuth;
const LIST_NAME = 'signo.lista';

const AuthProvider = ({ children }) => {
  let listTemp=[];
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCHING_URL_START':
          return {
            ...prevState,
            isLoading: true,
            info: undefined,
          };

        case 'FETCHING_URL_END':
          listTemp = [...prevState.lista];
          if (action.payload.signo) {
            listTemp = [...listTemp, action.payload];
            AsyncStorage.setItem(LIST_NAME, JSON.stringify(listTemp));
          }
          return {
            ...prevState,
            isLoading: false,
            info: action.payload,
            lista: listTemp,
          };

        case 'LOAD_LIST':
          return {
            ...prevState,
            lista: action.payload,
          };
        case 'START_SUGESTAO':
          return {
            ...prevState,
            sugestao: [],
          };
        case 'END_SUGESTAO':
          return {
            ...prevState,
            sugestao: action.payload,
          };
        case 'SELECT_INFO':
          return {
            ...prevState,
            info: action.payload,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      isLoading: false,
      info: undefined,
      lista: [],
      sugestao: [],
    }
  );

  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    console.log("setting onChangeUser");
    const bootstrapAsync = async () => {
      action.loadList();
    };
    bootstrapAsync();
  }, []);
  

  const action = React.useMemo(() => ({
    sugestao: async (text) => {
      dispatch({ type: 'START_SUGESTAO' });

      sugestao(text).then((result) =>
        dispatch({ type: 'END_SUGESTAO', payload: result })
      );
    },

    fechingURL: async (url) => {
      dispatch({ type: 'FETCHING_URL_START' });

      pesquisa(url).then((result) =>
        dispatch({ type: 'FETCHING_URL_END', payload: result })
      );
    },

    loadList: async () => {
      const item = await AsyncStorage.getItem(LIST_NAME);
      try {
        dispatch({ type: 'LOAD_LIST', payload: JSON.parse(item) });
      } catch (error) {
        console.error(error);
      }
    },
    saveList: async (list) => {
      await AsyncStorage.setItem(LIST_NAME, JSON.stringify(...list));
      dispatch({ type: 'LOAD_LIST', payload: list });
    },
    selectInfo: async (info) => dispatch({ type: 'SELECT_INFO', payload: info }),
  }));
  return (
    <ContextAuth.Provider value={{ action, state }}>
      {children}
    </ContextAuth.Provider>
  );
};
export const useInfo = () => useContext(ContextAuth);
export { AuthProvider };
