import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar
} from "react-native";
const { height, width } = Dimensions.get('window');
import { LabelInput } from "../../components/Forms";
import SnowflakeContext from "../../context/SnowFlake/snowflakeContext";
import { BgView, Header } from "../../components/Layouts";
import Button from "../../components/Button";
import { Lead, Paragraph } from "../../components/Typography";
import { ThemeContext } from "../../hooks/useTheme";

const IdentityRegistryAddress = ({ navigation }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);

  const theme = isLightTheme ? lightTheme : darkTheme;

  const snowflakeContext = useContext(SnowflakeContext);

  const { getIdentityAddress, error, identityAddress } = snowflakeContext;

  useEffect(() => {
    getIdentityAddress;
  }, []);

  const CopyToClipboard = async () => {
    await Clipboard.setString(identityAddress);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  console.log(identityAddress)

  return (
    <BgView>
      <Header.Back
        title="Identity Registry Address"
        onBackPress={navigation.goBack}
        containerStyle={styles.header}
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: width * 0.05}}>
        <KeyboardAvoidingView>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: width * 0.05
            }}
          >
            <Button text="Get Address" onPress={getIdentityAddress} />
          </View>
          <Lead style={{ fontWeight: "300", fontSize: 14, marginBottom: 4 }}>
            Identity Registry Address
          </Lead>
          <View
            style={{
              borderRadius: 5,
              marginBottom: 15,
              backgroundColor: theme.secondary,
              fontFamily: "Rubik-Regular",
              color: theme.basic,
              fontSize: 16,
              padding: 15,
            }}
          >
            {identityAddress !== null ? (
              <TouchableOpacity onPress={CopyToClipboard}>
                <Paragraph style={{ color: theme.basic }}> {identityAddress}</Paragraph>
              </TouchableOpacity>
            ) : (
              <Paragraph>Identity Address</Paragraph>
            )}
          </View>

          {error ? <Text style={{ color: "red" }}>Error : {error}</Text> : null}
        </KeyboardAvoidingView>
      </ScrollView>
    </BgView>
  );
};

const styles = StyleSheet.create({
  header: {
      marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
      paddingTop: 0,
      height: 50
  },

})

export default IdentityRegistryAddress;
