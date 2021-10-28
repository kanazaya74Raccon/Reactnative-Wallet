import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');
import { BgView } from "../../components/Layouts";
import { Paragraph, Lead } from "../../components/Typography";
import Button from "../../components/Button";
import SnowflakeContext from "../../context/SnowFlake/snowflakeContext";
import AsyncStorage from "@react-native-community/async-storage";

const AuthLanding = ({ navigation }) => {

  const [wallet_address_Value, setwallet_address_Value] = useState('');
  const onSubmit = async () => {
    const address = await AsyncStorage.getItem('@walletAddress');
    const hydroId = await AsyncStorage.getItem('@privateKey');
     
   // setwallet_address_Value(address);
    if (address, hydroId !== null) {
      navigation.navigate("app", { screen: "home", params: { address, hydroId } });
    } else {
      navigation.navigate("register");
    }
  };


  return (
    <BgView>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.ImageBox}>
            <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
          </View>
          <Lead style={styles.testVersion}>(Alpha Test Version)</Lead>
        </View>
        <View style={styles.middle}>
          <Image style={styles.hydro} source={require("../../assets/images/mist.png")} />
          <Paragraph style={styles.paragraph}>
            Register now to create your digital identity, transact and use the hydro
            protocols to secure who you are online.
        </Paragraph>
        </View>
        <View style={styles.bottom}>
          <Button text="Get Started" onPress={onSubmit} />
          <Button text="Recover" style={styles.recover} />
        </View>
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  top: {
    height: height * 20 / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ImageBox: {
    height: width * 0.15,
  },

  logo: {
    resizeMode: "contain",
    width: width * 0.3,
    height: height * 10 / 100,

  },

  middle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 60 / 100,
  },

  bottom: {
    position:'absolute',
    width: width,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },


  hydro: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },

  testVersion: {
    textAlign: "center",
    paddingTop: width * 0.03,
  },

  paragraph: {
    textAlign: "center",
    marginTop: width * 0.2,
    paddingHorizontal: width * 0.05
  },

  recover: {
    marginTop: -5,
   
  }
})

export default AuthLanding;
