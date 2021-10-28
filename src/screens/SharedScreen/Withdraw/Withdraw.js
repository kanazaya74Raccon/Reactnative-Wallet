import React, { Component } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Text,
    Dimensions,
    Linking,
    TouchableHighlight,
    PermissionsAndroid,
    Platform,
    StatusBar, StyleSheet, SafeAreaView, Clipboard, ToastAndroid,
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button/index";
import w3s from '../../../libs/Web3Service';
import { toWei } from '../../../libs/format';
import Web3 from 'web3';
import HydroToken from '../../../contracts/HydroToken.json'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeProvider } from '@react-navigation/native';
import { ethers, } from 'ethers';
import { Value } from 'react-native-reanimated';
import AsyncStorage from "@react-native-community/async-storage";
import { DepositCard, } from "../../../components/cards";
import QRCode from 'react-native-qrcode-svg';
const { height, width } = Dimensions.get('window');
//const Web3 = require("web3")
 
const _spender = "0xB0D5a36733886a4c5597849a05B315626aF5222E";

class Withdraw extends Component {
    state = {
        from: "",
        hydroaddress: "",
        amount: "",
        comments: "",
        isError: false,
        isSuccess: false,
        error: "",
        qrvalue: '',
        privatekeyValue: '',
        OpenScanner: false,
    }

    async componentDidMount() {
        this.retrieveData()
    }



    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@privateKey');    
            this.setState({ privatekeyValue: value })
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }
        } catch (error) {

        }
    }


    withdraw = async () => {

        try {

            if (!this.state.hydroaddress) {
                await this.setState({ isError: true, error: "Ether Address Required" })
                return
            } else {
                await this.setState({ isError: false })
            }

            if (!this.state.amount) {
                await this.setState({ isError: true, error: "uint256 must required!" })
                return
            } else {
                await this.setState({ isError: false })
            }
            
            let web3 = await new Web3('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');

            let privateKey = this.state.privatekeyValue;
            let wallet = new ethers.Wallet(privateKey)
            console.log(privateKey)

            var txCount = await web3.eth.getTransactionCount(wallet.address)

            var gasPrice = await web3.eth.getGasPrice()
            // gasPrice += 1

            let transaction = {
                to: this.state.hydroaddress,
                value: ethers.utils.parseEther(this.state.amount),
                chainId: 1,
                nonce: txCount,
                gasPrice: gasPrice
            }

            console.log(transaction)

            web3.eth.estimateGas(transaction).then(function (estimate) {
                transaction.gasLimit = estimate;
                console.log('estimate: ' + estimate);
                
                var signPromise = wallet.sign(transaction);
              
                signPromise.then((signedTransaction) => {
                    console.log(signedTransaction);
    
                    // let provider = new ethers.providers.Web3Provider(currentProvider);
                    // let provider = ethers.getDefaultProvider()
                    web3.eth.sendSignedTransaction(signedTransaction).then((tx) => {
                        console.log(tx);
                        // {
                        //    // These will match the above values (excluded properties are zero)
                        //    "nonce", "gasLimit", "gasPrice", "to", "value", "data", "chainId"
                        //
                        //    // These will now be present
                        //    "from", "hash", "r", "s", "v"
                        //  }
                        // Hash:
                    })
                    .catch((e)=>{
                        console.log(e.message)
                    })
                })
                .catch((e)=>{
                    console.log(e.message)
                })

            })
            .catch((e)=>{
                console.log(e.message)
            })
        }
        catch (ex) {
            console.log(ex)
            await this.setState({ isError: true })
            if (ex.message)
                await this.setState({ error: ex.message })
        }


    };


    onCopyToClipboard = async () => {
        await Clipboard.setString(this.props.route.params.walletToken);
        ToastAndroid.show("Copied To Clipboard!", ToastAndroid.SHORT);
    };
    onChange = (value) => {
        // alert(value)
        this.setState({ amount: value })
        console.log("state value --->", this.state.amount);
    }

    render() {
        console.log(this.props.route.params.walletToken, "Props")
        return (

            <BgView>
                <Header.Back title="Transfer Ether" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />

                        <LabelInput
                            label="Ether Address"
                            placeholder="Enter Ether Address"
                            // keyboardType={'number-pad'}
                            value={this.state.hydroaddress}
                            onChangeText={(value) => {
                                console.log(value)
                                this.setState({ hydroaddress: value })
                            }}
                        />
                        <LabelInput
                            label="Amount"
                            placeholder="0.00"
                            keyboardType={'number-pad'}
                            value={this.state.amount}
                            onChangeText={(value) => this.onChange(value)}
                        // onChangeText={(value) => {
                        //     console.log(value)
                        //     this.setState({ value })
                        // }}
                        />

                        {this.state.isError &&
                            <Text style={{ color: 'red' }}>
                                Error : {this.state.error}
                            </Text>
                        }
                        {this.state.isSuccess &&
                            <Text style={{ color: 'green' }}>
                                Transfer Success!
                            </Text>
                        }

                        <View style={{ flexDirection: 'row', flex: 1, }}>
                            <View style={styles.button}>
                                <Button text="Transfer" onPress={this.withdraw} />
                            </View>
                            {/* <View style={styles.button}>
                                <Button text="Read QR" onPress={this.onOpenScanner} />
                            </View> */}
                        </View>

                    </KeyboardAwareScrollView>
                </View>
            </BgView>

        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: width * 0.05
    },

    header: {
        marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
        paddingTop: 0,
        height: 50
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: width * 0.03,

    },
    qrcode: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.05,
        marginBottom: width * 0.05,
        marginRight: width * 0.02,
    },

})

export default Withdraw;