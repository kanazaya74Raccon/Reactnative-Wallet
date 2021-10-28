import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { ThemeContext } from "../../hooks/useTheme";
const { height, width } = Dimensions.get('window');
const Button = ({ onPress, text, style, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.primary,
        width: width - width * 0.10,
        padding: 12,
        borderRadius: 2,
        marginVertical: 25,
        ...style,
      }}
      onPress={onPress}
      {...props}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 19,
          letterSpacing: 0.5,
          lineHeight: 26,
          fontFamily: "Rubik-Regular",
          color: theme.white,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const WhiteButton = ({ onPress, text, style, ...props }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.background,
        width: width - width * 0.10,
        padding: 10,
        borderRadius: 2,
        ...style,
      }}
      onPress={onPress}
      {...props}
    >
      <Text
        style={{
          fontSize: 18,
          lineHeight: 26,
          fontFamily: "Rubik-Regular",
          color: theme.danger,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Button.Cancel = WhiteButton;
export default Button;
