import React, { useState, useContext, useEffect } from "react";
import { View, Image, Clipboard, ToastAndroid, AsyncStorage, Dimensions, Platform, StatusBar, StyleSheet, ScrollView } from "react-native";
import { SecondaryBgView, SecondaryHeader } from "../../components/Layouts";
import { ThemeContext } from "../../hooks/useTheme";
import { Paragraph } from "../../components/Typography";
import { SettingsCard, SettingsItemCard } from "../../components/cards";
import SnowflakeContext from "../../context/SnowFlake/snowflakeContext";
import Button from "../../components/Button";
import { add } from "lodash";
const { height, width } = Dimensions.get('window');

const Settings = ({ navigation, route }) => {

  const snowflakeContext = useContext(SnowflakeContext);

  const { hydroAddress } = snowflakeContext;
  console.log(hydroAddress)

  const [customToken, setCustomToken] = useState(null)
  //This function generates a random number used for the generation of qr code
  //   function generateRandomString(length) {
  //     var result = "";
  //     var characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     var charactersLength = characters.length;
  //     for (var i = 0; i < length; i++) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     }
  //     return result;
  //   }

  //   const [qrValue, setQrValue] = useState({
  //     initialValue: generateRandomString(10),
  //     valueForQRCode,
  //   });
  //   getValue = () => {
  //     setQrValue({ valueForQRCode: initialValue });
  //   };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCustomToken()
    });

    return unsubscribe;
  }, [navigation]);

  const getCustomToken = async () => {
    let customToken = await AsyncStorage.getItem("customToken")
    if (customToken) {
      customToken = JSON.parse(customToken)
      setCustomToken(customToken)
    }
  }

  const CopyToClipboard = async () => {
    await Clipboard.setString(address);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };


  const onAddPress = async () => {
    navigation.navigate('addCustomToken')
  }
  const { toggleTheme } = useContext(ThemeContext);

  const { address } = route.params

  return (
    <SecondaryBgView>
      <SecondaryHeader.Back title="Settings" onBackPress={navigation.goBack} />

      <SettingsCard
        hydroAddress={address}
        onIdPress={CopyToClipboard}
        onAddPress={onAddPress}
        customToken={customToken}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingBottom: width * 0.05
        }}>
        <SettingsItemCard value="Export keys" />
        <SettingsItemCard value="Advanced" />
        <SettingsItemCard value="Change Password" />
        <SettingsItemCard value="Dark Mode" onPress={toggleTheme} />
        <SettingsItemCard value="Contact Card" onPress={() => navigation.navigate('contact')} />
        <SettingsItemCard value="Rate Us" />
        <SettingsItemCard value="Lending" onPress={() => navigation.navigate('comingSoon')} />
        <SettingsItemCard value="Stacking" onPress={() => navigation.navigate('comingSoon')} />
        <SettingsItemCard value="Borrowing" onPress={() => navigation.navigate('comingSoon')} />
        <SettingsItemCard value="Loan" onPress={() => navigation.navigate('comingSoon')} />
      </ScrollView>
    </SecondaryBgView>
  );
};

export default Settings;
