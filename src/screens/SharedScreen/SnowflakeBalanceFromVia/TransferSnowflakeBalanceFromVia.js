import React, { Component } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar
} from "react-native";
import { LabelInput } from "../../../components/Forms";
import { BgView, Header } from "../../../components/Layouts";
import Button from "../../../components/Button";
import w3s from '../../../libs/Web3Service';
const { height, width } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class TransferSnowflakeBalanceFromVia extends Component {
    state = {
        einTo: "",
        einFrom: "",
        via: "",
        _bytes: "",
        amount: "",
        isError: false,
        isSuccess: false,
        error: ""
    }
    componentDidMount() {
        w3s.initContract()
    }
    transfer = async () => {
        try {
            if (!this.state.einFrom) {
                await this.setState({ isError: true, error: "einFrom must required!" })
                return
            }
            else if (!this.state.via) {
                await this.setState({ isError: true, error: "via must required!" })
                return
            }
            else if (!this.state.einTo) {
                await this.setState({ isError: true, error: "einTo must required!" })
                return
            }
            else if (!this.state.amount) {
                await this.setState({ isError: true, error: "amount must required!" })
                return
            }
            else if (!this.state._bytes) {
                await this.setState({ isError: true, error: "_bytes must required!" })
                return
            }
            else {
                await this.setState({ isError: false })
            }

            console.log("[LOAD TOKEN]")
            const myContract = await w3s.createContract();
            console.log(myContract, "myContract");
            let token = await myContract.methods.transferSnowflakeBalanceFromVia(this.state.einFrom, this.state.via, this.state.einTo, this.state.amount, this.state._bytes,).call()
            console.log(token)
        }
        catch (ex) {
            console.log(ex)
            await this.setState({ isError: true })
            if (ex.message)
                await this.setState({ error: ex.message })
        }

    }
    render() {
        return (
            <BgView>
                <Header.Back title="Transfer Snowflake Balance From" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />
                        <LabelInput
                            label="einFrom"
                            placeholder="uint256"
                            value={this.state.einFrom}
                            onChangeText={(value) => {
                                // console.log(value)
                                this.setState({ einFrom: value })
                            }}
                        />
                        <LabelInput
                            label="Via"
                            placeholder="address"
                            value={this.state.via}
                            onChangeText={(value) => {
                                // console.log(value)
                                this.setState({ via: value })
                            }}
                        />
                        <LabelInput
                            label="einTo"
                            placeholder="uint256"
                            value={this.state.einTo}
                            onChangeText={(value) => {
                                // console.log(value)
                                this.setState({ einTo: value })
                            }}
                        />
                        <LabelInput
                            label="amount"
                            placeholder="uint256"
                            value={this.state.amount}
                            onChangeText={(value) => {
                                console.log(value)
                                this.setState({ amount: value })
                            }}
                        />
                        <LabelInput
                            label="_bytes"
                            placeholder="bytes"
                            value={this.state._bytes}
                            onChangeText={(value) => {
                                console.log(value)
                                this.setState({ _bytes: value })
                            }}
                        />

                        {this.state.isError &&
                            <Text style={{ color: 'red' }}>
                                Error : {this.state.error}
                            </Text>
                        }
                        {this.state.isSuccess &&
                            <Text style={{ color: 'green' }}>
                                Transfer Successfully !
                            </Text>
                        }
                        <View style={styles.button}>
                            <Button text="Transfer" onPress={this.transfer} />
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
export default TransferSnowflakeBalanceFromVia;