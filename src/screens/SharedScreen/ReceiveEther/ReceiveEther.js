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
import { DepositCard, EtherBalance } from "../../../components/cards";
import w3s from '../../../libs/Web3Service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get('window');
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from "@react-native-community/async-storage";
import { ethers, } from 'ethers';
import Web3 from 'web3';


class ReceiveEther extends Component {
    state = {
        addressTo: "",
        amount: "",
        isError: false,
        isSuccess: false,
        error: "",
        qrvalue: "",
        qrSection: false,
        walletaddress: "",
        etherbalance: "",
        privateKey: "",
    }

    async componentDidMount() {
        await w3s.initContract()
        this.retrieveData()
    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@privateKey');    
            let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
            let provider = new ethers.providers.Web3Provider(currentProvider);
            let wallet = new ethers.Wallet(value, provider)
            this.setState({walletaddress: wallet.address})
            if (value !== null) {
                console.log('PrivateKey-->', value)
            }

            const abi = await w3s.getHydroTokenABI()
            const hydrotokenaddress = await w3s.getHydroTokenAddress()
            const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

            let etherbalance = await wallet.getBalance()
            etherbalance = Web3.utils.fromWei(etherbalance.toString())
            this.setState({etherbalance: etherbalance})

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

                    <EtherBalance
                        hydroAddress={this.state.etherbalance}
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
export default ReceiveEther;
