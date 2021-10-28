import React, { useState, useContext } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Dimensions,
  Platform, StatusBar, StyleSheet
} from "react-native";
import { LabelInput } from "../../components/Forms";
import { BgView, Header } from "../../components/Layouts";
import { Paragraph, Lead } from "../../components/Typography";
import { ThemeContext } from "../../hooks/useTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get('window');


const Contact = ({ navigation }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;

  const hydroAddress = "0x9F1CA7955D40FF9798472a4b9b621d8e";

  const btcAddress = "38ECqrDguHdy1GZ5V2hSP3dt3HZSFfXZrM";

  const ethAddress = "0x931D387731bBbC988B312206c74F77D0";

  const CopyHydroAddressToClipboard = async () => {
    await Clipboard.setString(hydroAddress);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  const CopyEthAddressToClipboard = async () => {
    await Clipboard.setString(ethAddress);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  const CopyBtcAddressToClipboard = async () => {
    await Clipboard.setString(btcAddress);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  return (
    <BgView>
      <Header.Back title="Contact Card" onBackPress={navigation.goBack} containerStyle={styles.header} />
      <View style={styles.top} >
        <TouchableOpacity>
          <Image source={require("../../assets/images/emma.png")} style={{ borderRadius: 50, width: 100, height: 100 }} />
        </TouchableOpacity>
        <Lead style={styles.name}>Emmanuel Njoku</Lead>

        <View style={styles.box}>
          <View style={styles.box}>
            <Lead>HYDRO</Lead>
            <TouchableOpacity
              style={{
                padding: 7,
                backgroundColor: theme.secondary,
                borderRadius: 5,
                marginVertical: width * 0.01
              }}
              onPress={CopyHydroAddressToClipboard}
            >
              <Paragraph>{hydroAddress}</Paragraph>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <Lead>BTC</Lead>
            <TouchableOpacity
              style={{
                padding: 7,
                backgroundColor: theme.secondary,
                borderRadius: 5,
                marginVertical: width * 0.01
              }}
              onPress={CopyBtcAddressToClipboard}
            >
              <Paragraph style={{ textAlign: "center", fontSize: 14 }}>
                {btcAddress}
              </Paragraph>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Lead>ETH</Lead>
            <TouchableOpacity
              style={{
                padding: 7,
                backgroundColor: theme.secondary,
                borderRadius: 5,
                marginVertical: width * 0.01
              }}
              onPress={CopyEthAddressToClipboard}
            >
              <Paragraph style={{ textAlign: "center", fontSize: 14 }}>
                {ethAddress}
              </Paragraph>
            </TouchableOpacity>
          </View>
        </View>
      </View>



      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <Icon
            name="file-download"
            color={theme.basic}
            solid={true}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: "5%", paddingLeft: "5%" }}>
          <Icon name="paper-plane" color={theme.basic} solid={true} size={22} />
        </TouchableOpacity>
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({
  top: {
    marginVertical: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    textAlign: "center", marginVertical: width * 0.05, fontSize: 20
  },

  header: {
    marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    paddingTop: 0,
    height: 50
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.05
  },

  box: {
    paddingTop: width * 0.03
  }

})

export default Contact;
