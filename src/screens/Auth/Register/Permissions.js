import React, { useState, useContext, useEffect } from "react";
import { View, Text, Alert, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');

import SnowflakeContext from "../../../context/SnowFlake/snowflakeContext";
import { LabelInput } from "../../../components/Forms/index";
import { BgView, Header } from "../../../components/Layouts";
import { Paragraph, Lead } from "../../../components/Typography";
import Button from "../../../components/Button";
import w3s from "../../../libs/Web3Service";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Permissions = ({ route, navigation }) => {
  const [timestamp] = useState(Math.round(new Date() / 1000) - 120);

  const [hydro, setHydroId] = useState({ hydroId: "" });
  const [spinner, setSpinner] = useState(false);
  const { hydroId } = hydro;

  const [fulfilledCalled, setFulfilled] = useState(false);

  const handleChange = (field) => (value) => {
    setHydroId({ ...hydro, [field]: value });
  };

  const { address } = route.params;
  const snowflakeContext = useContext(SnowflakeContext);

  const {
    createSignedMessage,
    signature,
    isHydroIdAvailable,
    hydroIDAvailable,
  } = snowflakeContext;


  //handle input data
  useEffect(() => {
    setFulfilled(true);
    if (fulfilledCalled && [hydroId.length === 6]) {
      isHydroIdAvailable(hydroId);
    }
  }, [fulfilledCalled, hydroId]);

  useEffect(() => {
    w3s.initContract();
    retrieveData();
  }, []);

  console.log(`default address created ${address}`);

  const onSubmit = (e) => {
   
    e.preventDefault();
    if (hydroId === "") {
      Toast.show({
        type: 'error',
        text1: 'Hydro ID Required',
        text2: 'Please enter your Hydro ID'
      });
      return;
    } else {
      createSignedMessage(timestamp, address);
      navigation.navigate("claim", { hydroId, signature, address, timestamp });
    }
    storeData();
  };

  const storeData = async () => {
      try {
        await AsyncStorage.setItem('@hydro_id_key', hydroId)
        console.log('addresssss------>', hydroId)
      } catch (error) {
        console.log(error)
      }
    }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@privateKey');  
      if (value !== null) {
        console.log('p----', value)
      }
    } catch (error) {

    }
  }

  


  return (

    <BgView>
      <View style={styles.container}>
      <Header.Back onBackPress={navigation.goBack} title="Permission" containerStyle={styles.header} />

      <View>
        <KeyboardAwareScrollView contentContainerStyle={styles.inputView} showsVerticalScrollIndicator={false}>
          <View style={{ paddingVertical: width * 0.05 }} />

          <Image style={styles.permission} source={require("../../../assets/images/permissions.png")} />

          <View style={{ width: width - width * 0.10, paddingTop: width * 0.1, paddingBottom: width * 0.05 }}>
            <LabelInput
              label="Hydro ID"
              value={hydro.hydroId}
              placeholder="Hydro Id"
              onChangeText={handleChange("hydroId")}
            />
          </View>


          <Paragraph style={styles.paragraph}>
            This step is for you to create your Hydro ID and give us permission to
            create your account on the blockchain. This requires your signature of
            a hashed permission string
          </Paragraph>

          <View style={styles.buttonContainer}>
            <Button text="Accept" onPress={onSubmit} />
          </View>
        </KeyboardAwareScrollView>
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)}/>
      </View>
    </BgView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
  },

  header: {
    paddingTop: 0,
    height: 50
  },

  permission: {
    resizeMode: 'contain',
    width: width * 0.5,
    height: width * 0.5
  },

  inputView: {
    height: height,
    alignItems: 'center',
  },

  paragraph: {
    textAlign: "center",
    paddingHorizontal: width * 0.05
  },

  buttonContainer: {
    position:'absolute',
    width: width,
    bottom: 50, 
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Permissions;
