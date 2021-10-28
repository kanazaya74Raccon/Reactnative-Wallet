import React, { Component } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage,
    ToastAndroid,
    Dimensions,
    Platform, StatusBar, StyleSheet
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get('window');


class AddCustomToken extends Component {
    state = {
        contractAddress: "",
        decimals: "",
        symbol: ""
    }
    addCustomToken = async () => {
        if (!this.state.contractAddress)
            return ToastAndroid.show("Contract Address Is Required", ToastAndroid.LONG);
        if (!this.state.symbol)
            return ToastAndroid.show("Symbol Is Required", ToastAndroid.LONG);
        if (!this.state.decimals)
            return ToastAndroid.show("Decimals Is Required", ToastAndroid.LONG);
        let objCustomToken = {
            contractAddress: this.state.contractAddress,
            decimals: this.state.decimals,
            symbol: this.state.symbol
        }
        await AsyncStorage.setItem("customToken", JSON.stringify(objCustomToken))
        this.props.navigation.goBack()

    }
    render() {
        return (
            <BgView>
                <Header.Back title="Add Custom Token" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />
                        <LabelInput
                            label="Contact Address"
                            placeholder="Contact Address"
                            value={this.state.contractAddress}
                            onChangeText={(value) => this.setState({ contractAddress: value })}
                        />
                        <LabelInput
                            label="Symbol"
                            placeholder="Symbol"
                            value={this.state.symbol}
                            onChangeText={(value) => this.setState({ symbol: value })}
                        />
                        <LabelInput
                            label="Decimals"
                            placeholder="Decimals"
                            value={this.state.decimals}
                            onChangeText={(value) => this.setState({ decimals: value })}
                        />

                        <View style={styles.button}>
                            <Button text="Add Token" onPress={this.addCustomToken} />
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
        paddingVertical: width * 0.05
    }

})
export default AddCustomToken;