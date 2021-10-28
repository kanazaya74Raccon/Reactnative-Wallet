import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { BgView } from "../../components/Layouts";
import { Paragraph } from "../../components/Typography";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { ThemeContext } from "../../hooks/useTheme";
import AsyncStorage from "@react-native-community/async-storage"
import { styles } from "./style";
const { height, width } = Dimensions.get('window');

const { buttonContainer } = styles;

const slides = [
  {
    id: "1",

    body:
      "Using our snowflake protocol, we secure your unique identity on the blockchain",
    image: require("../../assets/images/identity.png"),
  },
  {
    id: "2",

    body: "All around security with 2FA using our Raindrop Protocol",
    image: require("../../assets/images/password.png"),
  },
  {
    id: "3",

    body:
      "Store tokens and transfer Hydro Tokens to friends and family in Bitcon or Ether",
    image: require("../../assets/images/transfer.png"),
  },
];

const Landing = ({ navigation }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;

  const renderDoneButton = () => {
    return (
      <View style={buttonContainer}>
        <Icon
          name="ios-checkmark"
          color={theme.primary}
          size={36}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={buttonContainer}>
        <Icon
          name="ios-arrow-forward"
          color={theme.primary}
          size={30}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };
  const renderItem = ({ item: { image, body, id } }) => {
    return (
      <BgView style={{ justifyContent: "center" }} key={id}>
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "40%",
            marginBottom: "20%",
            alignSelf: "center",
          }}
          source={image}
        />

        <View style={{ marginBottom: "30%" }}>
          <Paragraph style={{ textAlign: "center", fontSize: 18, paddingHorizontal: width * 0.05 }}>
            {body}
          </Paragraph>
        </View>
      </BgView>
    );
  };

  const [showApp, setShowApp] = useState(false);
  const onDone = () => {
    setShowApp(!showApp);
    navigation.navigate("auth");
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      dotStyle={{ backgroundColor: theme.basic }}
      activeDotStyle={{ backgroundColor: theme.primary }}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
    />
  );
};

export default Landing;
