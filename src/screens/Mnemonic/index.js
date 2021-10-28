import React, { useState, useContext } from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    Clipboard, StatusBar
} from 'react-native';
var { width, height } = Dimensions.get('window');
import AsyncStorage from "@react-native-community/async-storage";
import bip39 from 'react-native-bip39'
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgView, Header } from "../../components/Layouts";

export default class Mnemonic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mnemonic: null,
        }
        
    }
    
    generateString = async () => {
        var mnemonic = await bip39.generateMnemonic(128);
        this.setState({
            mnemonic: mnemonic
        })
    }


    set_Text_Into_Clipboard = async () => {
        await Clipboard.setString(this.state.mnemonic);
    }

    navigation = () => {
        const { mnemonic } = this.state;
        this.props.navigation.navigate('validate', {
            mnemonic: mnemonic,
            address: this.props.route.params.address
        })
    }

    render() {
        const { mnemonic } = this.state;
        return (
            <BgView>
                <View style={styles.container}>
                    <Header.Back onBackPress={() => this.props.navigation.goBack()} title="Mnemonic Code" containerStyle={styles.header} />


                    <View style={styles.main}>
                        <View style={styles.topContainer}>
                            <Text style={styles.title}>Mnemonic</Text>
                            <Text style={styles.subtitle}>You can generate a new BIP39 mnemonic. {'\n'}Please save or write it down BIP39 mnemonic.</Text>
                            <Button
                                title={'Generate Mnemonic'}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this.generateString()}
                            />

                            <Text style={styles.generatedText}>{mnemonic}</Text>

                        </View>

                        <View style={styles.bottom}>

                            <View style={{ flex: 1, marginRight: width * 0.05 }}>
                                {mnemonic &&
                                    <TouchableOpacity onPress={this.set_Text_Into_Clipboard}
                                        style={[styles.box, {
                                            borderColor: '#e0e0e0',
                                            backgroundColor: '#e0e0e0'
                                        }]}                               >
                                        <Text style={[styles.next, { color: '#757575', paddingLeft: 0 }]}>Copy Mnemonic</Text>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={[styles.box, {
                                backgroundColor: mnemonic ? '#2960CA' : '#e0e0e0',
                                borderColor: mnemonic ? '#2960CA' : '#e0e0e0'
                            }]}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={mnemonic ? () => this.navigation() : () => { }}>
                                    <Text style={[styles.next, { color: mnemonic ? '#FFFFFF' : '#757575', }]}>Next</Text>
                                    <Icon name='forward' size={width * 0.05} color={mnemonic ? '#FFFFFF' : '#757575'} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </BgView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    header: {
        marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
        paddingTop: 0,
        height: 50
    },

    main: { paddingHorizontal: width * 0.05, flex: 1 },

    topContainer: {
        paddingVertical: width * 0.05
    },

    title: {
        fontFamily: "Rubik-Bold",
        fontSize: width * 0.06,
        color: '#424242'
    },

    subtitle: {
        fontFamily: "Rubik-Regular",
        fontSize: width * 0.04,
        color: '#616161'
    },

    button: {
        width: width - (width * 0.1),
        marginVertical: width * 0.05,
        backgroundColor: '#2960CA',
        padding: 10,
    },

    buttonTitle: {
        fontFamily: "Rubik-Regular",
        fontSize: width * 0.05,
    },

    generatedText: {
        fontFamily: "Rubik-Bold",
        fontSize: width * 0.05,
        color: '#757575',
        textAlign: 'justify',
    },

    bottom: {
        position: 'absolute',
        bottom: width * 0.05,
        left: width * 0.05,
        flexDirection: 'row'
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
        paddingLeft: 15,
        paddingVertical: 5,
    },

    icon: {
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5
    },

});



