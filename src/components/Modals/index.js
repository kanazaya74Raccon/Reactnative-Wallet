import React, { useContext } from "react";
import { View, Modal } from "react-native";
import { ThemeContext } from "../../hooks/useTheme";

export const HalfWay = ({ visible, onClose, children, containerStyle }) => {
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? lightTheme : darkTheme;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: theme.background,
            height: "60%",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            justifyContent: "space-between",
            shadowColor: theme.primary,
            shadowOffset: {
              width: 0,
              height: -12,
            },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            ...containerStyle,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};
