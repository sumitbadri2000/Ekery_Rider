import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Walletmain from '../Screens/Wallet/Walletmain'
import Topupscreen from '../Screens/Wallet/Topupscreen'
import Balancedetails from '../Screens/Wallet/Balancedetails'
import BankDetails from '../Screens/Wallet/BankDetails'


const Walletnavigation = () => {

    const Walletstack = createNativeStackNavigator()
  return (
  <Walletstack.Navigator>
    <Walletstack.Screen name='Walletmain' component={Walletmain}>
        

    </Walletstack.Screen>
    <Walletstack.Screen name='Topup' component={Topupscreen}></Walletstack.Screen>
    <Walletstack.Screen name='Balancedetails' component={Balancedetails}></Walletstack.Screen>
    <Walletstack.Screen name='BankDetails' component={BankDetails}></Walletstack.Screen>
  </Walletstack.Navigator>
  )
}

export default Walletnavigation