import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homerider from '../Screens/Homerider';
import Ridedetails from '../Screens/Ridedetails';
const RiderHomeStack = createNativeStackNavigator();

const RiderNavigation = () => {
  return (
    <RiderHomeStack.Navigator>
      <RiderHomeStack.Screen
        name="RiderHomescreen"
        component={Homerider}
        options={{headerShown: false}}
      />

      <RiderHomeStack.Screen
        name="Ridedetails"
        component={Ridedetails}
        options={{headerShown: false}}
      />
    </RiderHomeStack.Navigator>
  );
};

export default RiderNavigation;
