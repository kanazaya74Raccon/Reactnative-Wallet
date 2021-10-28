import React, { useEffect } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage"
import LoadingView from 'react-native-loading-view'

const Landing = ({ navigation }) => {
  useEffect(async () => {
    const address = await AsyncStorage.getItem('@walletAddress');
    const hydroId = await AsyncStorage.getItem('@privateKey');
    if (address, hydroId !== null) {
      navigation.navigate("app", { screen: "home", params: { address, hydroId } })
    }
    else
      navigation.navigate("landing")
  }, [])

  return (
    <LoadingView loading={true}>
    </LoadingView>
  );
};

export default Landing;
