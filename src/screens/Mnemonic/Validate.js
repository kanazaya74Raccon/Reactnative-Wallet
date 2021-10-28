import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Clipboard,
  StatusBar,
  ToastAndroid
} from 'react-native';
var { width, height } = Dimensions.get('window');

import bip39 from 'react-native-bip39'
//import {ethers,wallet} from 'ethers';
import { Button, Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message';
import { ethers } from 'ethers';
import crypto from 'crypto'
import { Buffer } from 'buffer'
import axios from 'axios';
import { BgView, Header } from "../../components/Layouts";
const wallet = ethers.Wallet.createRandom();


export default class Validate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: null,
      spinner: false,
      privateKey: '',
      publicKey: null,
      isGenerate: false,
      mnemonicValue: '',
      password: '',
      secureTextEntry: true,
      isGenerateKey: false,
      connection: true
    }
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem('@encrypted_Key');

    this._netSubscription = NetInfo.addEventListener(state => {
      console.log(
        'This is connection in internet check component => ',
        state.isConnected,

      );
      console.log(state)
      if (this.state.connection !== state.isConnected) {
        let res = state.isConnected;
        this.setState({ connection: res })
      }
    });
  }

  componentWillUnmount() {
    this._netSubscription();
  }

  // generateKeys = async (value) => {                              
  //   this.setState({ spinner: true }, async () => {
  //     axios.post('http://wallet.hydro.ethernity.live:8080/hdkey', {
  //       mnemonic: value //await bip39.generateMnemonic(128)
  //     })
  //       .then(response => {
  //         if (response.data.status) {
  //           console.log(response.data)
  //           this.setState({
  //             spinner: false,
  //             isGenerate: response.data.status,
  //             privateKey: response.data.root.xpriv,
  //             publicKey: response.data.root.xpub
  //           })
  //         }
  //       })
  //       .catch(error => {
  //         this.setState({ spinner: false })
  //         alert(error);
  //       });
  //   })
  // }

  generateKeys = async (value) => {
    this.setState({ spinner: true }, async () => {
      axios.post('http://wallet.hydro.ethernity.live:8080/hdkey/', {
        mnemonic: value //await bip39.generateMnemonic(128)
      })
        .then(response => {
          if (response.data.status) {
            console.log(response.data)
            this.setState({
              spinner: false,
              isGenerate: response.data.status,
              privateKey: wallet.privateKey,
              publicKey: wallet.address,
            })
          }
        })
        .catch(error => {
          this.setState({ spinner: false })
          alert(error);
        });
    })
  }

  check = () => {
    const { connection, mnemonicValue } = this.state;
    if (!connection) {
      this.connectToInternet();
      return;
    }

    if (mnemonicValue == '') {
      this.setState({ errorMessage: 'Enter BIP39 Mnemonic' });
      return;
    }

    var validate = bip39.validateMnemonic(mnemonicValue)
    if (validate) {
      this.generateKeys(mnemonicValue);
    } else {
      this.setState({ errorMessage: 'Invalid BIP39 Mnemonic' })
      setTimeout(() => {
        this.props.navigation.navigate('mnemonic');
      }, 500)
    }
  }

  generateENCKeys = () => {
    const { connection, password } = this.state;
    if (!connection) {
      this.connectToInternet();
      return;
    }

    if (password == '') {
      this.setState({ errorPasswordMessage: 'Enter Password' });
      return;
    }

    this.setState({ spinner: true }, async () => {
      axios.post('http://wallet.hydro.ethernity.live:8080/passwordkey/', {
        key: this.state.privateKey,
        password: this.state.password
      })
        .then(response => {
          if (response.data.status) {
            console.log(response.data.key)
            this.setState({
              spinner: false,
              isGenerateKey: response.data.status,
              encKeyFinal: response.data.key
            })
          }
        })
        .catch(error => {
          this.setState({ spinner: false })
          alert(error);
        });
    })

  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@encrypted_Key', this.state.encKeyFinal)
      setTimeout(() => {
        this.props.navigation.navigate("permissions", { address: this.props.route.params.address });
      }, 1000)
    } catch (e) {
      console.log(e)
    }
  }

  connectToInternet = () => {
    Toast.show({
      type: 'error',
      text1: 'Connection Error',
      text2: 'Please check your internet connection'
    });
  }

  get_clipboard_word = async () => {
    var textHolder = await Clipboard.getString();
    this.setState({
      mnemonicValue: textHolder
    })
  }

  CopyToClipboard = async (string) => {
    await Clipboard.setString(string);
    ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
  };

  render() {
    const { mnemonic, isGenerateKey, encKeyFinal, secureTextEntry, privateKey, publicKey, isGenerate, mnemonicValue, password } = this.state;
    return (
      <BgView>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            small={'small'}
            color={'#2960CA'}
          />

          <Header.Back onBackPress={() => this.props.navigation.goBack()} title="Mnemonic Code" containerStyle={styles.header} />

          <KeyboardAwareScrollView contentContainerStyle={{ height: height - 50 - StatusBar.currentHeight }} showsVerticalScrollIndicator={false}>
            {!isGenerate &&
              <View style={styles.topContainer}>
                <Text style={styles.label}>BIP39 Mnemonic</Text>
                <View style={styles.containerCode}>
                  <TextInput
                    placeholder='Please enter BIP39 Mnemonic...'
                    multiline={true}
                    placeholderTextColor={'#7777'}
                    textAlignVertical={'top'}
                    style={[styles.input, { height: 100 }]}
                    returnKeyType={'done'}
                    onChangeText={value => this.setState({ mnemonicValue: value })}
                    value={mnemonicValue}
                    autoCapitalize={'none'}
                    onFocus={() => this.setState({ mnemonicValue: null })}
                  />
                </View>
                {this.state.errorMessage &&
                  <Text style={styles.error}>{this.state.errorMessage}</Text>
                }



                <View style={{
                  position: 'absolute', right: width * 0.05, bottom: 0, flexDirection: 'row'
                }}>
                  <Button
                    title={'Paste'}
                    onPress={() => this.get_clipboard_word()}
                    titleStyle={[styles.buttonTitle, { color: '#757575' }]}
                    buttonStyle={[styles.button, { marginRight: width * 0.02, backgroundColor: '#e0e0e0' }]}
                  />
                  <Button
                    disabled={!mnemonicValue ? true : false}
                    title={'Submit'}
                    onPress={() => this.check()}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                  />
                </View>
              </View>
            }


            <View style={styles.main}>
              {isGenerate &&
                <View>
                  <View style={styles.seprate} />
                  <Text style={styles.title}>Private Key</Text>
                  <TouchableOpacity style={styles.boxgray} onPress={() => this.CopyToClipboard(privateKey)}>
                    <Text style={styles.subtitle}>{privateKey}</Text>
                  </TouchableOpacity>

                  <View style={styles.seprate} />
                  <Text style={styles.title}>Public Key</Text>
                  <TouchableOpacity style={styles.boxgray} onPress={() => this.CopyToClipboard(publicKey)}>
                    <Text style={styles.subtitle}>{publicKey}</Text>
                  </TouchableOpacity>


                  <View style={{ marginTop: width * 0.05 }}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <TextInput
                          placeholder='Password'
                          placeholderTextColor={'#7777'}
                          secureTextEntry={this.state.secureTextEntry}
                          style={styles.input}
                          returnKeyType={'done'}
                          onChangeText={value => this.setState({ password: value })}
                          onFocus={() => this.setState({ errorPasswordMessage: null })}
                          value={password}
                        />
                      </View>
                      <View style={{ flex: 0.2, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
                          <Icon name={!secureTextEntry ? 'visibility-off' : 'visibility'} size={width * 0.07} color={'#9e9e9e'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {this.state.errorPasswordMessage &&
                      <Text style={styles.error}>{this.state.errorPasswordMessage}</Text>
                    }
                  </View>

                </View>
              }

              {isGenerateKey &&
                <View style={{ marginTop: 10 }}>
                  <View style={styles.seprate} />
                  <Text style={styles.title}>Encrypted Key</Text>
                  <TouchableOpacity style={styles.boxgray} onPress={() => this.CopyToClipboard(encKeyFinal)}>
                    <Text style={styles.subtitle}>{encKeyFinal}</Text>
                  </TouchableOpacity>
                </View>
              }
              <View style={styles.bottom}>



                <View style={[styles.box, {
                  backgroundColor: isGenerate && password ? '#2960CA' : '#e0e0e0',
                  borderColor: isGenerate && password ? '#2960CA' : '#e0e0e0'
                }]}>
                  {isGenerateKey &&
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => this.storeData()}>
                      <Text style={[styles.next, { color: isGenerateKey ? '#FFFFFF' : '#757575' }]}>Save Encrypted Key</Text>
                      <Icon name='forward' size={width * 0.05} color={isGenerateKey ? '#FFFFFF' : '#757575'} style={styles.icon} />
                    </TouchableOpacity>
                  }
                  {!isGenerateKey &&
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={isGenerate ? () => this.generateENCKeys() : () => { }}>
                      <Text style={[styles.next, {
                        color: isGenerate && password ? '#FFFFFF' : '#757575'
                      }]}>Generate Encrypted Key</Text>
                      <Icon name='forward' size={width * 0.05} color={isGenerate && password ? '#FFFFFF' : '#757575'} style={styles.icon} />
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>

            <Toast ref={(ref) => Toast.setRef(ref)} />
          </KeyboardAwareScrollView>
        </View>
      </BgView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  header: {
    marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    paddingTop: 0,
    height: 50
  },
  main: {
    paddingHorizontal: width * 0.05,
    flex: 1
  },

  topContainer: {
    paddingTop: width * 0.04,
    paddingHorizontal: width * 0.05,
    position: 'relative',
    height: 200
  },

  seprate: {
    height: 15
  },

  title: {
    fontFamily: "Rubik-Bold",
    fontSize: width * 0.06,
    color: '#424242'
  },

  subtitle: {
    fontFamily: "Rubik-Medium",
    fontSize: width * 0.04,
    color: '#616161',
    paddingVertical: 5
  },


  bottom: {
    position: 'absolute',
    bottom: width * 0.05,
    right: width * 0.05
  },

  box: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 25,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },

  next: {
    fontFamily: "Rubik-Regular",
    fontSize: width * 0.05,
    color: '#757575',
    paddingLeft: 15,
    paddingVertical: 5,
  },

  icon: {
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 5
  },

  button: {
    width: 100,
    paddingVertical: width * 0.01,
    backgroundColor: '#2960CA',
    height: 40
  },

  buttonTitle: {
    fontFamily: "Rubik-Regular",
    fontSize: width * 0.05,
  },

  label: {
    color: '#9e9e9e',
    fontFamily: "Rubik-Bold",
    fontSize: width * 0.04,
    paddingBottom: 5
  },

  input: {
    height: 45,
    fontSize: width * 0.05,
    fontFamily: "Rubik-Medium",
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#9e9e9e',
  },

  containerCode: {
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 2,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },

  error: {
    color: 'red',
    fontFamily: "Rubik-Medium",
    paddingTop: 3
  },

  boxgray: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    width: width - width * 0.1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  }
});


