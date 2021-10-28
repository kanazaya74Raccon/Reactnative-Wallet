import React, { useContext } from "react";
import { Lead } from "../Typography";
import { ThemeContext } from "../../hooks/useTheme";
import { TextInput as TextInput_, View } from "react-native";

export const TextInput = (props) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <TextInput_
      autoCapitalize="none"
      placeholderTextColor={theme.basic}
      style={{
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: theme.secondary,
        fontFamily: "Rubik-Regular",
        color: theme.basic,
        fontSize: 16,
        padding: 10,
        paddingRight: 15
      }}
      {...props}
    />
  );
};

export const LabelInput = ({ label, ...props }) => {
  return (
    <View>
      <Lead style={{ fontWeight: "300", fontSize: 14, marginBottom: 5 }}>
        {label}
      </Lead>
      <TextInput {...props} />
    </View>
  );
};
