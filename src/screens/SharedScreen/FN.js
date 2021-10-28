import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-svg';
import { BgView, Header } from '../../components/Layouts';
// import snowFlakeAbi from '../../Snowflake.json';
import snowFlakeAbi from '../../contracts/Snowflake.json';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';

// const contractAddress = "0x28E84CAFb98b3dc8F05C97203EB36D117de74899";
const contractAddress = "0x28E84CAFb98b3dc8F05C97203EB36D117de74899";


class FN extends Component {
    async componentDidMount() {
        try {
            console.log("====================================================>")
            console.log("====================================================>")
            
            const web3 = await new Web3(new Web3.providers.HttpProvider(`http://localhost:8545`));
            alert(web3)
            // await new Contract.setProvider(new Contract.providers.HttpProvider('http://localhost:8545'));
            const contract = await new web3.eth.Contract(snowFlakeAbi.abi, contractAddress)
            console.log(contract)
            // let hydroToken = await
            // console.log(contract.defaultAccount)


            //transferSnowflakeBalance(uint256,uint256)
            //withdrawSnowflakeBalance(address,uint256)
            //transferSnowflakeBalanceFrom(uint256,uint256,uint256)
            //withdrawSnowflakeBalanceFrom(uint256,address,uint256)
            //transferSnowflakeBalanceFromVia(uint256,address,uint256,uint256,bytes)
            //withdrawSnowflakeBalanceFromVia(uint256,address,address,uint256,bytes)
            contract.methods.hydroTokenAddress().call().then((result) => {
                console.log(result);

            }).catch(function (err) {
                console.log('err...\n' + err);
            });





            // let hydroToken = await contract.methods.active().call()

            // console.log(hydroToken);
            // let resOfHydro = await hydroToken.call()
            // console.log(resOfHydro);
            // let accounts=await web3.eth.getAccounts()
            // let accounts=await web3.eth.getBalance(contractAddress)
            // let accounts=await web3.eth.getTransaction()
            //  let accounts=await web3.eth.
            // console.log(accounts)
            // web3.eth.getBlock('latest').then((data) => {
            //     console.log(data)
            // }).catch(error => {
            //     console.log(error)
            // })
            // const networkID = await web3.eth.net.getId();
            // console.log(networkID, "networkID")
            // const contract = new web3.eth.Contract(ABI, contractAddress);
            // const balance = await contract.methods.balance().call();
            // console.log("balance", balance)
        }
        catch (ex) {
            console.log(ex);
        }

    }
    render() {
        return (
            <BgView>
                <Header.Back title="FN Page" onBackPress={this.props.navigation.goBack} />
                <View
                    style={{
                        // marginTop: 500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <Text style={{ color: 'black' }}>
                        This is thE FN
                    </Text>
                </View>
            </BgView>
        );
    }
}

export default FN;