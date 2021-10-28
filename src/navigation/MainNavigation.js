//@@Dev this component handles navigation for authentication
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Dashboard/Home";
import Notification from "../screens/SharedScreen/Notification";
import Settings from "../screens/SharedScreen/Settings";
import Success from "../screens/SharedScreen/Success";
import TxCard from "../screens/SharedScreen/TransactionCard";
import Contact from "../screens/SharedScreen/Contact";
import Snowflake from "../screens/SharedScreen/Snowflake";
import HydroTokenAddress from "../screens/SharedScreen/HydroTokenAddress";
import IdentityRegistryAddress from "../screens/SharedScreen/IdentityRegistryAddress";
import FN from "../screens/SharedScreen/FN";
import TransferSnowflakeBalance from "../screens/SharedScreen/SnowflakeBalance/TransferSnowflakeBalance";
import WithdrawSnowflakeBalance from "../screens/SharedScreen/SnowflakeBalance/WithdrawSnowflakeBalance";
import WithdrawSnowflakeBalanceFrom from "../screens/SharedScreen/SnowflakeBalanceFrom/WithdrawSnowflakeBalanceFrom";
import WithdrawSnowflakeBalanceFromVia from "../screens/SharedScreen/SnowflakeBalanceFromVia/WithdrawSnowflakeBalanceFromVia";
import TransferSnowflakeBalanceFrom from "../screens/SharedScreen/SnowflakeBalanceFrom/TransferSnowflakeBalanceFrom";
import TransferSnowflakeBalanceFromVia from "../screens/SharedScreen/SnowflakeBalanceFromVia/TransferSnowflakeBalanceFromVia";
import ComingSoon from "../screens/SharedScreen/ComingSoon/ComingSoon";
import AddCustomToken from "../screens/SharedScreen/AddCustomToken/AddCustomToken";
import Withdraw from "../screens/SharedScreen/Withdraw/Withdraw";
import Deposits from "../screens/SharedScreen/Deposits/Deposits";
import scanqr from "../screens/SharedScreen/Scanqr";
import Transfer from "../screens/SharedScreen/Transfer/Transfer";
import ReceiveEther from "../screens/SharedScreen/ReceiveEther/ReceiveEther";
import ReceiveTusc from "../screens/SharedScreen/ReceiveTusc/ReceiveTusc";
import Account from "../screens/SharedScreen/Account";
import TransferTusc from "../screens/SharedScreen/TransferTusc/TransferTusc";
import EtherHistory from "../screens/SharedScreen/EtherHistory/EtherHistory";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="transfertusc" component={TransferTusc} />
        <Stack.Screen name="transfer" component={Transfer} />
        <Stack.Screen name="receiveether" component={ReceiveEther} />
        <Stack.Screen name="receivetusc" component={ReceiveTusc} />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="etherhistory" component={EtherHistory} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="success" component={Success} />
        <Stack.Screen name="txCard" component={TxCard} />
        <Stack.Screen name="contact" component={Contact} />
        <Stack.Screen name="snowflake" component={Snowflake} />
        <Stack.Screen name="hydrotokenaddress" component={HydroTokenAddress} />
        {/* <Stack.Screen name="hydrotokenaddress" component={FN} /> */}
        <Stack.Screen name="identityregistryaddress" component={IdentityRegistryAddress} />
        <Stack.Screen name="deposits" component={Deposits} />
        <Stack.Screen name="scanqr" component={scanqr} />
        <Stack.Screen name="transfersnowflakebalance" component={TransferSnowflakeBalance} />
        <Stack.Screen name="withdrawsnowflakebalance" component={WithdrawSnowflakeBalance} />
        <Stack.Screen name="transfersnowflakebalancefrom" component={TransferSnowflakeBalanceFrom} />
        <Stack.Screen name="withdrawsnowflakebalancefrom" component={WithdrawSnowflakeBalanceFrom} />
        <Stack.Screen name="transfersnowflakebalancefromvia" component={TransferSnowflakeBalanceFromVia} />
        <Stack.Screen name="withdrawsnowflakebalancefromvia" component={WithdrawSnowflakeBalanceFromVia} />
        <Stack.Screen name="comingSoon" component={ComingSoon} />
        <Stack.Screen name="addCustomToken" component={AddCustomToken} />
        <Stack.Screen name="withdraw" component={Withdraw} />
      </Stack.Navigator>
   
  );
};

export default MainNavigation;
