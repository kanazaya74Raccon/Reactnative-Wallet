import React, { useContext, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Clipboard,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  BackHandler
} from "react-native";
import { BgView, Header } from "../../components/Layouts";
import { Paragraph, Lead } from "../../components/Typography";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ThemeContext } from "../../hooks/useTheme";
import { TxFeedCard, HydroCard, EtherCard, TuscCard } from "../../components/cards";
import SnowflakeContext from "../../context/SnowFlake/snowflakeContext";
import Button from "../../components/Button";
import LottieView from 'lottie-react-native';
import w3s from '../../libs/Web3Service';
import AsyncStorage from "@react-native-community/async-storage";
import { ethers, } from 'ethers';
import Web3 from 'web3';

const { height, width } = Dimensions.get('window');
const Home = ({ navigation, route }) => {
  const [hydrobalance, setHydrobalance] = React.useState(0);
  const [etherbalance, setEtherbalance] = React.useState(0);

  const snowflakeContext = useContext(SnowflakeContext);
  const { address, hydroId } = route.params;
  const TxFeed = [
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 1,
    },
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 2,
    },
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 3,
    },
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 4,
    },
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 5,
    },
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 6,
    },
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 7,
    },
    {
      image: require("../../assets/images/emma.png"),
      name: "Emma",
      amount: "10.091",
      currency: "bitcoin",
      amountEquivalent: "0.0001BTC",
      id: 8,
    },
  ];

  const { isLightTheme, lightTheme, darkTheme, toggleTheme } = useContext(
    ThemeContext
  );

  const theme = isLightTheme ? lightTheme : darkTheme;

  function handleBackButtonClick() {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    } else {
      return false;
    }

  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const handlegetHydroBalance = async () => {
    try {
      const value = await AsyncStorage.getItem('@privateKey');
      let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
      let provider = new ethers.providers.Web3Provider(currentProvider);
      let wallet = new ethers.Wallet(value, provider)
      // this.setState({ walletaddress: wallet.address })

      const abi = await w3s.getHydroTokenABI()
      const hydrotokenaddress = await w3s.getHydroTokenAddress()
      const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

      let hydrobalance = await contract.balanceOf(wallet.address);
      hydrobalance = Web3.utils.fromWei(hydrobalance.toString())
      setHydrobalance(hydrobalance)

    } catch (error) {
      console.log(error)
    }
  }

  const handlegetEtherBalance = async () => {
    try {
      const value = await AsyncStorage.getItem('@privateKey');
      let currentProvider = await new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75cc8cba22ab40b9bfa7406ae9b69a27');
      let provider = new ethers.providers.Web3Provider(currentProvider);
      let wallet = new ethers.Wallet(value, provider)
      // this.setState({ walletaddress: wallet.address })

      const abi = await w3s.getHydroTokenABI()
      const hydrotokenaddress = await w3s.getHydroTokenAddress()
      const contract = new ethers.Contract(hydrotokenaddress, abi, wallet)

      let etherbalance = await wallet.getBalance()
      etherbalance = Web3.utils.fromWei(etherbalance.toString())
      setEtherbalance(etherbalance)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handlegetHydroBalance();
    handlegetEtherBalance();
  }, [])

  return (
    <BgView>

      <Header
        leftComponent={
          <View style={styles.nav}>
            <View style={styles.headerLeft}>
              <Image style={{ resizeMode: "contain", width: width * 0.2 }} source={require("../../assets/images/logo.png")} />
            </View>
          </View>
        }

        rightComponent={
          <View style={styles.nav}>
            <TouchableOpacity onPress={toggleTheme} style={{ paddingHorizontal: width * 0.02 }}>
              <Icon name="moon" color={theme.basic} solid={true} size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("notification", { hydroId })} style={{ paddingHorizontal: width * 0.02 }}>
              <Icon name="bell" color={theme.basic} solid={true} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingLeft: width * 0.02, paddingRight: '1%' }}
              onPress={() => navigation.navigate("settings", { address })}
            >
              <Icon name="cog" color={theme.basic} size={20} />
            </TouchableOpacity>
          </View>
        }

        containerStyle={{
          marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
          borderBottomWidth: 0,
          height: Platform.OS === 'ios' ? 70 - 20 : 70 - 20,
          paddingTop: Platform.OS === 'ios' ? - 20 : 0,
          borderBottomWidth: 1
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: width * 0.05 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <HydroCard
            balance={hydrobalance}
            address={address}
            cardName="Hydro Card"
            transfer={() => navigation.navigate("transfer")}
            deposit={() => navigation.navigate("deposits", { walletToken: address })}
          />

          <EtherCard
            balance={etherbalance}
            address={address}
            cardName="Ether Card"
            withdraw={() => navigation.navigate("withdraw", { walletToken: address })}
            transfer={() => navigation.navigate("receiveether")}
            history={() => navigation.navigate("etherhistory", { walletToken: address })}
          />

          <TuscCard
            balance="0"
            address={address}
            cardName="Tusc Card"
            withdraw={() => navigation.navigate("transfertusc", { walletToken: address })}
            transfer={() => navigation.navigate("receivetusc")}
            account={() => navigation.navigate("account")}
          />

          { /* <Button style={{ marginTop: "10%" }} text="Snowflake" onPress={() => navigation.navigate("snowflake")} /> */}
        </View>

        {/* {identityAddress !== null ? (
          <>
            <Lead style={{ textAlign: "left", color: theme.primary, fontSize:20, paddingTop:10 }}>
              Identity Address
            </Lead>

            <TouchableOpacity
              onPress={CopyIdentityAddressClipboard}
              style={{
                padding: 10,
                backgroundColor: theme.secondary,
                marginTop: "5%",
              }}
            >
              <Paragraph style={{ color: theme.basic }}>
                
                {identityAddress}
              </Paragraph>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{ marginTop: "5%" }}
              text="Get Identity Address"
              onPress={getIdentityAddress}
            />
          </View>
          )} */}


        {/*<Lead style={{ paddingVertical: width * 0.05 }}>Tx Feed</Lead>*/}
        { /*<View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={require('../../assets/tx.json')}
            autoPlay
            key={1}
            loop
            style={{ width: '60%', height: '100%', }}
          />
        </View> }
        <Paragraph
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 22,
            marginTop: "30%",
          }}
        >
          You have no transaction record. 
        </Paragraph> 
        { <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {TxFeed.map((feedItem, id) => (
            <TxFeedCard {...feedItem} key={id} />
          ))}
          </View> */}
      </ScrollView>

    </BgView>
  );
};


const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.03
  },

  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: width * 0.03
  },

})

export default Home;
