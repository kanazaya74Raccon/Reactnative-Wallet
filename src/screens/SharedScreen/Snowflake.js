import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { SnowflakeItemCard } from '../../components/cards';
import { SecondaryBgView, SecondaryHeader } from '../../components/Layouts';
import { ScrollView } from 'react-native';
const { height, width } = Dimensions.get('window');

class Snowflake extends Component {
    render() {
        return (
            <SecondaryBgView>
                <SecondaryHeader.Back title="Snowflake" onBackPress={this.props.navigation.goBack} />
                <View style={{ paddingVertical: width * 0.02 }}/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        paddingBottom: width * 0.05
                    }}
                >
                    <SnowflakeItemCard value="Hydro Token Address" onPress={() => this.props.navigation.navigate("hydrotokenaddress")} />
                    <SnowflakeItemCard value="Identity Registry Address" onPress={() => this.props.navigation.navigate("identityregistryaddress")} />
                    <SnowflakeItemCard value="Deposits" onPress={() => this.props.navigation.navigate("deposits", {walletToken: ''})} />
                    <SnowflakeItemCard value="Transfer Snowflake Balance" onPress={() => this.props.navigation.navigate("transfersnowflakebalance")} />
                    <SnowflakeItemCard value="Withdraw Snowflake Balance" onPress={() => this.props.navigation.navigate("withdrawsnowflakebalance")} />

                    <SnowflakeItemCard value="Transfer Snowflake Balance From" onPress={() => this.props.navigation.navigate("transfersnowflakebalancefrom")} />
                    <SnowflakeItemCard value="Withdraw Snowflake Balance From" onPress={() => this.props.navigation.navigate("withdrawsnowflakebalancefrom")} />

                    <SnowflakeItemCard value="Transfer Snowflake Balance From Via" onPress={() => this.props.navigation.navigate("transfersnowflakebalancefromvia")} />
                    <SnowflakeItemCard value="Withdraw Snowflake Balance From Via" onPress={() => this.props.navigation.navigate("withdrawsnowflakebalancefromvia")} />

                </ScrollView>
            </SecondaryBgView>
        );
    }
}

export default Snowflake;