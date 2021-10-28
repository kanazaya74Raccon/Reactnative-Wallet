import React, { Component } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Text,
    Dimensions,
    Platform, StatusBar, StyleSheet, PermissionsAndroid, SafeAreaView
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/TwoButton/index";
import { DepositCard, TuscBalance } from "../../../components/cards";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get('window');
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from "@react-native-community/async-storage";
import {Apis} from "tuscjs-ws";
import {ChainStore, FetchChain, PrivateKey, TransactionHelper, Aes, TransactionBuilder, SerializerValidation} from "tuscjs";

class ReceiveTusc extends Component {
    state = {
        addressTo: "",
        amount: "",
        isError: false,
        isSuccess: false,
        error: "",
        qrvalue: "",
        qrSection: false,
        walletaddress: "",
        tuscbalance: "",
        privateKey: "",
    }

    async componentDidMount() { 
        this.retrieveData()
    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@accountprivateKey');    

            if (value !== null) {
                console.log('PrivateKey-->', value)
                this.setState({privateKey: value})
                let publicKey = PrivateKey.fromWif(value).toPublicKey().toString()
                console.log('publickey', publicKey)
                this.setState({walletaddress: publicKey})
            }

            const accountName = await AsyncStorage.getItem('@accountName');    

            if (value !== null) {
                console.log('accountName-->', accountName)
                this.setState({accountName: accountName})
            }

            Apis.instance('wss://node.testnet.bitshares.eu/', true).init_promise.then((res) => {

                return Apis.instance().db_api().exec("lookup_accounts", [
                    this.state.accountName, 100
                ]).then(accounts => {
                    Apis.instance().db_api().exec("get_full_accounts", [accounts[0], false]).then(res => {
                        let tuscbalance = res[0][1]['balances'][0]['balance']
                        this.setState({tuscbalance: tuscbalance})
                    })
                })
            })

        } catch (error) {
            console.log(error)
        }
    }


    onBarcodeScan = (qrvalue) => {
        // Called after te successful scanning of QRCode/Barcode
        this.setState({ Qrvalue: qrvalue });
        this.setState({ setOpenScanner: false });
    };

    
    onSuccess = e => {
        if ( e.data !== "" ){
            this.setState({ qrSection: false })
            this.setState({ qrvalue: e.data })
        }
    };
    openqr = () => {
        this.setState({ qrSection: true }) 
    };
    render() {

        return (
            <BgView>
                <Header.Back title="Receive" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ paddingVertical: width * 0.02 }} />

                    <DepositCard
                        hydroAddress={this.state.walletaddress}
                        onIdPress={this.onCopyToClipboard}
                    />

                    <View style={styles.qrcode}>
                        <QRCode
                            value={JSON.stringify(this.state.walletaddress)}
                            size={width * 0.8}
                            color="white"
                            backgroundColor="black"
                            logoSize={30}
                            logoMargin={2}
                            logoBorderRadius={15}
                            logoBackgroundColor="yellow"
                        />
                    </View>

                    <TuscBalance
                        tuscAddress={this.state.tuscbalance}
                        onIdPress={this.onCopyToClipboard}
                    />
                </KeyboardAwareScrollView>
            </BgView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: "center",
        paddingHorizontal: width * 0.05,

    },

    header: {
        marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
        paddingTop: 0,
        height: 50
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: width * 0.05,
        flex: 1
    }

});
export default ReceiveTusc;
