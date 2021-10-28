import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { Animated, Easing, View, StatusBar, Platform, Text } from "react-native";
import AppContainer from "./navigation/AppContainer";
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from "lottie-react-native";
import ThemeContextProvider from "./hooks/useTheme";
import SnowflakeState from "./context/SnowFlake/SnowflakeState";
import Web3 from "web3";
import MainNavigation from "./navigation/MainNavigation";
import Home from './screens/Dashboard/Home'
import { Alert } from "react-native";
console.disableYellowBox = true;
const ShowAnimation = () => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <LottieView
        source={require("./assets/waves.json")}
        autoPlay
        key={1}
        loop
        style={{
          height: "100%",
          width: "100%",
        }}
      /> */}

      <Text>Welcome!</Text>
    </View>
  );
};

const App = ({ navigation, route }) => {
  const [animationTime, setAnimationTime] = useState(false);

  useEffect(async () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27`
      )
    );

    // console.log(web3)
    SplashScreen.hide();
    // console.log('calling')
  }, []);
  setTimeout(() => {
    setAnimationTime(true);
  }, 5200);
  return (
    <ThemeContextProvider>
      <SnowflakeState>
        {/* {wallet_address_Value !== null ? <MainNavigation /> : <AppContainer />} */}
        {animationTime ? <AppContainer /> : <ShowAnimation />}
      </SnowflakeState>
    </ThemeContextProvider>
  );
};

export default App;
