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


class WithdrawSnowflakeBalance extends Component {
    state = {
        to: "",
        amount: "",
        isError: false,
        isSuccess: false,
        error: ""
    }
    componentDidMount() {
        w3s.initContract()
    }
    withdraw = async () => {
        try {
            if (!this.state.to) {
                await this.setState({ isError: true, error: "to must required!" })
                return
            }
            else if (!this.state.amount) {
                await this.setState({ isError: true, error: "amount must required!" })
                return
            }
            else {
                await this.setState({ isError: false })
            }

            console.log("[LOAD TOKEN]")
            const myContract = await w3s.createContract();
            console.log(myContract, "myContract");
            let token = await myContract.methods.withdrawSnowflakeBalance(this.state.to, this.state.amount).call()
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
                <Header.Back title="Withdraw Snowflake Balance" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: width * 0.02 }} />
                        <LabelInput
                            label="to"
                            placeholder="uint256"
                            value={this.state.to}
                            onChangeText={(value) => {
                                // console.log(value)
                                this.setState({ to: value })
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

                        {this.state.isError &&
                            <Text style={{ color: 'red' }}>
                                Error : {this.state.error}
                            </Text>
                        }
                        {this.state.isSuccess &&
                            <Text style={{ color: 'green' }}>
                                Withdraw Successfully !
                            </Text>
                        }
                        <View style={styles.button}>
                            <Button text="Withdraw" onPress={this.withdraw} />
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

export default WithdrawSnowflakeBalance;