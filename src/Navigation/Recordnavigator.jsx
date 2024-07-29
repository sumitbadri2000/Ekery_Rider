import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Record from '../Screens/Record';
import Paydetails from '../Screens/Paydetails';

const Recordstacknavigator = createNativeStackNavigator();


const Recordnavigator = () => {
  return (

    <Recordstacknavigator.Navigator>
        <Recordstacknavigator.Screen name='records' component={Record}></Recordstacknavigator.Screen>
        <Recordstacknavigator.Screen name='PayDetails' component={Paydetails}></Recordstacknavigator.Screen>
    </Recordstacknavigator.Navigator>
    
  )
}

export default Recordnavigator