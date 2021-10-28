import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import { BgView, Header } from "../../../components/Layouts";
import AsyncStorage from "@react-native-community/async-storage";


class Account extends Component {
    state = {
        name: "",
        privateKey: "",
    }

    async componentDidMount() {
        this.setState({ name: await AsyncStorage.getItem('@accountName') });
    }

    handleChangename = (text) => {
        this.setState({ name: text })
    };

    handleChangekey = (text) => {
        this.setState({ privateKey: text })
    };

    handlereset = async () => {
        this.setState({ name: '' })
        this.setState({ privateKey: '' })

        await AsyncStorage.setItem('@accountName', '');
        await AsyncStorage.setItem('@accountprivateKey', '');
    }

    handlesave = async () => {
        await AsyncStorage.setItem('@accountName', this.state.name);
        await AsyncStorage.setItem('@accountprivateKey', this.state.privateKey);
        console.log('saved--->', this.state.name, this.state.privatekey)
    }

    render() {
        return (
            <BgView>
                <Header.Back title="Account" onBackPress={this.props.navigation.goBack} containerStyle={styles.header} />
                <View style={styles.continer}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#333"
                        autoCapitalize="none"
                        placeholder="Account Name"
                        value={this.state.name}
                        onChangeText={text => { this.handleChangename(text) }}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#333"
                        autoCapitalize="none"
                        placeholder="Private Key"
                        value={this.state.privateKey}
                        onChangeText={text => this.handleChangekey(text)}
                    />
                    <View style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnlogin}
                            onPress={this.handlesave}
                        >
                            <Text style={styles.btntxt}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnlogin}
                            onPress={this.handlereset}
                        >
                            <Text style={styles.btntxt}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BgView>
        );
    }

}

const styles = StyleSheet.create({
    continer: {
        width: '100%',
        alignItems: 'center'
    },
    header: {
        marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
        paddingTop: 0,
        height: 50
    },
    input: {
        backgroundColor: '#f9fbfd',
        width: '90%',
        borderColor: '#ecf0f4',
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 12,
        marginBottom: 5,
        marginTop: 25,
        paddingLeft: 20
    },
    btnlogin: {
        width: '30%',
        height: 45,
        backgroundColor: '#ffe530',
        padding: '1%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ecf0f4',
        borderWidth: 1,
        borderRadius: 3,
        shadowColor: "#00000029",
        shadowOpacity: 0,
        elevation: 6,
        margin: 14
    },
    btntxt: {
        fontSize: 14,
        fontWeight: '500'
    },
});

export default Account;