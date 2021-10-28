import React, { useReducer, useEffect } from "react";
import SnowflakeContext from "./snowflakeContext";
import snowflakeReducer from "./snowflakeReducer";
import IdentityRegistry from "../../contracts/IdentityRegistry.json";
import Web3 from "web3";
import AsyncStorage from '@react-native-community/async-storage'
import Snowflake from "../../contracts/Snowflake.json";
import w3s from "../../libs/Web3Service";
import {
  CLEAR_ERRORS,
  GET_HYDRO_ADDRESS,
  IDENTITY_ERROR,
  CREATE_DEFAULT_WALLET,
  GET_IDENTITY_ADDRESS,
  ADDRESS_ERROR,
  CREATE_DEFAULT_WALLET_ERROR,
  CREATE_SIGNATURE,
  IS_HYDRO_ID_AVAILABLE,
} from "../types";
import { randomBytes } from 'react-native-randombytes';
import uuid from 'react-native-uuid'

const SnowflakeState = ({ children }) => {
  const initialState = {
    ein: null,
    hydroIDAvailable: false,
    hydroAddress: null,
    defaultWalletData: null,
    walletError: null,
    signature: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(snowflakeReducer, initialState);



  useEffect(() => {
    w3s.initContract();


  }, []);

  const generateRandomRef = async () => {
    // var result = "";
    // console.log(randomBytes, "RNRandomBytes")
    console.log(uuid.v4())
    let data = await randomBytes(32)
    return uuid.v4(); //data.toString('base64');

    // var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.+++!!0123456789";

    // for (var i = 0; i < 32; i++) {
    //   result += characters.charAt(
    //     Math.floor(Math.random() * characters.length)
    //   );
    // }
    // return result;
  };






  //check if hydro ID is available
  const isHydroIdAvailable = async (hydroId) => {
    try {
      const myContract = await w3s.createClientRaindropAddress();

      const response = await myContract.methods
        .hydroIDAvailable(hydroId)
        .call();

      console.log(response);

      dispatch({ type: IS_HYDRO_ID_AVAILABLE, payload: response });
    } catch (err) {
      console.log(`this is ex full error object ${err}`);

      dispatch({ type: ADDRESS_ERROR, payload: err.message });
    }
  };

  // create default address
  const createDefaultAddress = async () => {
    let entropy = await generateRandomRef();//"1234567890123456"
    try {
      console.log(w3s.web3.eth.accounts.wallet, "W3S");
      console.log(entropy, "entropy");
      let myAccount = await w3s.web3.eth.accounts.wallet.create(1, entropy);
      console.log(myAccount, "createDefaultAddress")
      dispatch({ type: CREATE_DEFAULT_WALLET, payload: myAccount });
      return myAccount
    } catch (err) {
      console.log(err, "createDefaultAddress")
      throw Error(err || "Something went wrong");
    }
  };


  // create signature
  const createSignedMessage = async (address, timestamp) => {
    try {
      const signature = await w3s.web3.utils.soliditySha3(
        "0x19",
        "0x00",
        IdentityRegistry.address,
        "I authorize the creation of an Identity on my behalf.",
        address,
        address,
        {
          t: "address[]",
          v: [Snowflake.address],
        },
        {
          t: "address[]",
          v: [],
        },
        timestamp
      );
      console.log(`signature : ${signature}`);
      dispatch({ type: CREATE_SIGNATURE, payload: signature });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: ADDRESS_ERROR, payload: err.message });
    }
  };

  const signPersonal = async (address, signedMessage) => {
    return new Promise((resolve, reject) => {
      w3s.web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: [
          address,
          message,
        ],
        address,
      },
        (err, result) => {
          if (result.err) {
            return reject(err);
          }

          const signature = result.result.substring(2);
          const r = "0x" + signature.substring(0, 64);
          const s = "0x" + signature.substring(64, 128);
          const v = parseInt(signature.substring(128, 130), 16);

          const signatureObject = {};

          signatureObject.r = r;
          signatureObject.s = s;
          signatureObject.v = v;
          signatureObject.from = address;
          console.log(signatureObject)
          return resolve(signatureObject);
        });
    });

  }

  // create ethereum identity
  const createIdentity = async (timestamp, signature, hydroId, address) => {
    try {
      const myContract = await w3s.createSnowflakeContract();


      const r = "0x" + signature
      const s = "0x" + signature;
      const v = parseInt(signature);


      const signatureObject = {};

      signatureObject.r = r;
      signatureObject.s = s;
      signatureObject.v = v;

      const response = await myContract.methods
        .createIdentityDelegated(
          address,
          address,
          [],
          hydroId,
          signatureObject.v,
          signatureObject.r,
          signatureObject.s,
          timestamp
        )
        .send({
          from: address,
        });


      console.log(`ein : ${response}`);
      dispatch({ type: GET_IDENTITY_ADDRESS, payload: response });
    } catch (err) {
      console.log(`ein error: ${err.message}`);
      dispatch({ type: IDENTITY_ERROR, payload: err.message });
    }
  };

  return (
    <SnowflakeContext.Provider
      value={{
        ein: state.ein,
        hydroAddress: state.hydroAddress,
        loading: state.loading,
        defaultWalletData: state.defaultWalletData,
        walletError: state.walletError,
        signature: state.signature,
        hydroIDAvailable: state.hydroIDAvailable,
        error: state.error,
        isHydroIdAvailable,
        createSignedMessage,
        createDefaultAddress,
        createIdentity,
        signPersonal
      }}
    >
      {children}
    </SnowflakeContext.Provider>
  );
};
export default SnowflakeState;
