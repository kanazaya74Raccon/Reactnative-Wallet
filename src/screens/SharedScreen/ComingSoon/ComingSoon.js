import React, { Component } from 'react';
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    StatusBar
} from "react-native";

import { BgView, Header } from "../../../components/Layouts";
import { ComingSoonCard } from '../../../components/cards';
const { height, width } = Dimensions.get('window');


class ComingSoon extends Component {
    render() {
        return (
            <BgView>
                <Header.Back title="Coming Soon" onBackPress={this.props.navigation.goBack} containerStyle={styles.header}/>
                <ScrollView contentContainerStyle={{ justifyContent:'center', alignItems:'center'}}>
                    <ComingSoonCard />
                </ScrollView>
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

})

export default ComingSoon;