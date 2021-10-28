//@@Dev this component handles navigation for authentication
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthLanding from "../screens/Auth/AuthLanding";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register/index";
// import Hydro from "../screens/Auth/Register/Hydro"
import Permissions from "../screens/Auth/Register/Permissions";
import Claim from "../screens/Auth/Register/Claim";

import Mnemonic from "../screens/Mnemonic/index";
import Validate from "../screens/Mnemonic/Validate";
const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="authLanding" component={AuthLanding} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="permissions" component={Permissions}/>
      <Stack.Screen name="claim" component={Claim}/>
      {/* <Stack.Screen name="hydro" compopnent={Hydro}/>  */}
      <Stack.Screen name="mnemonic" component={Mnemonic}/>
      <Stack.Screen name="validate" component={Validate}/>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
