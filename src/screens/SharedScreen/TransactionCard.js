import React, { useState, useContext } from "react";
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, StatusBar } from "react-native";
import { LabelInput } from "../../components/Forms";
import { BgView, Header } from "../../components/Layouts";
import { Paragraph, Lead } from "../../components/Typography";
import { ThemeContext } from "../../hooks/useTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import Button from "../../components/Button";
const { height, width } = Dimensions.get('window');

const TxCard = ({ navigation }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <BgView>
      <Header.Back title="Transaction Card" onBackPress={navigation.goBack} containerStyle={styles.header} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("contact")} style={{ marginVertical: width * 0.05 }}>
          <Image source={require("../../assets/images/emma.png")} style={{ borderRadius: 50, width: 100, height: 100 }} />
        </TouchableOpacity>
        <Lead style={styles.name}>Emmanuel Sent you &#36; 10.22 in BTC</Lead>
        <Paragraph style={{ textAlign: "center", paddingBottom: width * 0.05, fontSize: 14 }} >
          Coffe + bullar! Thank you for the lunch
        </Paragraph>
        <View
          style={{
            backgroundColor: theme.secondaryCard,
            paddingHorizontal: 10,
            paddingVertical: 12,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,
            elevation: 18,
            borderRadius: 10,
          }}
        >
          {[
            [" 2020-01-01 :", "- TX Information from the blockchain"],
            [" 2020-01-01 :", "- TX Information from the blockchain"],
            [" 2020-01-01 :", "- TX Information from the blockchain"],
            [" 2020-01-01 :", "- TX Information from the blockchain"],
            [" 2020-01-01 :", "- TX Information from the blockchain"],
          ].map(([key, value]) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Lead style={{ flexShrink: 0 }}>{key}</Lead>
              <Paragraph
                style={{
                  fontSize: 13,
                  textAlign: "right",
                }}
              >
                {value}
              </Paragraph>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: width * 0.05
        }}
      >
        <View
          style={{
            marginVertical: width * 0.05,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Icon
              name="user-plus"
              color={theme.basic}
              solid={true}
              size={20}
              style={{ paddingRight: "5%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="file-download"
              color={theme.basic}
              solid={true}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: "5%", paddingLeft: "5%" }}
          >
            <Icon
              name="paper-plane"
              color={theme.basic}
              solid={true}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Lead style={{ fontSize: 20, textAlign: "right" }}>
            + &#36; 10.22
          </Lead>
          <Paragraph>+0.00005BTC</Paragraph>
        </View>
      </View>
    </BgView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  header: {
    marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    paddingTop: 0,
    height: 50
  },

  name: {
    textAlign: "center", marginTop: width * 0.05, fontSize: 20
  },


})

export default TxCard;
