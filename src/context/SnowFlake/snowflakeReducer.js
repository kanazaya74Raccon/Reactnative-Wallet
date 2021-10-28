import {
  GET_HYDRO_ADDRESS,
  GET_IDENTITY_ADDRESS,
  IS_HYDRO_ID_AVAILABLE,
  CREATE_DEFAULT_WALLET,
  CREATE_DEFAULT_WALLET_ERROR,
  CLEAR_ERRORS,
  CREATE_SIGNATURE,
  ADDRESS_ERROR,
  IDENTITY_ERROR,
} from "../types";
import AsyncStorage from '@react-native-community/async-storage'

export default (state, action) => {
  switch (action.type) {
    case GET_HYDRO_ADDRESS:
      return {
        ...state,
        hydroAddress: action.payload,
        loading: false,
      };
    case CREATE_SIGNATURE:
      return {
        ...state,
        signature: action.payload,
      };
    case CREATE_DEFAULT_WALLET:
      // AsyncStorage.setItem('address', JSON.stringify(action.payload))
      // console.log(action.payload)
      return {
        ...state,
      defaultWalletData:action.payload,
        loading: false,
        walletError: null
      };
      case CREATE_DEFAULT_WALLET_ERROR:
        AsyncStorage.removeItem('address')
        return {
          ...state,
          defaultWalletData:null,
          loading:false,
          walletError:action.payload
        }
    case GET_IDENTITY_ADDRESS:
      return {
        ...state,
        ein: action.payload,
        loading: false,
      };
    case IS_HYDRO_ID_AVAILABLE:
      return {
        ...state,
        hydroIDAvaialble: action.payload,
      };
    case ADDRESS_ERROR:
      return {
        ...state,
        hydroAddress: null,
        hydroIDAvailable: false,
        signature: null,
        defaultAddress: null,
        loading: false,
        error: action.payload,
      };
    case IDENTITY_ERROR:
      return {
        ...state,
        ein: null,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
