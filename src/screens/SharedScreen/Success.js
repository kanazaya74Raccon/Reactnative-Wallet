import React, { useState, useContext } from "react";
import { View, Image, Dimensions,
  Platform, StatusBar, StyleSheet } from "react-native";
import { LabelInput } from "../../components/Forms";
import { BgView, Header } from "../../components/Layouts";
import { Paragraph, Lead } from "../../components/Typography";
import { ThemeContext } from "../../hooks/useTheme";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get('window');

const Success = ({ navigation }) => {
  return (
    <BgView>
      <Header.Back title="Success" onBackPress={navigation.goBack} containerStyle={styles.header} />
      <View
        style={styles.container}>
        <Image
          source={require("../../assets/images/success2.png")}
          style={{ resizeMode: "contain", width: '100%', height: '50%' }}
        />
        <Paragraph
          style={{ marginVertical: "10%", textAlign: "center", fontSize: 18 }}
        >
          Great! Your Transaction is Being Processed
        </Paragraph>

        <View style={styles.button}>
        <Button
          text="View Transaction Card"
          onPress={() => navigation.navigate("txCard")}
        />
        </View>
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
      marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
      paddingTop: 0,
      height: 50
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: width * 0.05,
    width: width
  }
  

})

export default Success;
