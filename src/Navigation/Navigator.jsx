import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splashscreen from '../Components/Splashscreen';
import Firstscreen from '../Components/Firstscreen';
import {NativeBaseProvider} from 'native-base';
import Ridersignup from '../Screens/Ridersignup';
import Riderbottomnavigator from './Riderbottomnavigator';
import Homerider from '../Screens/Homerider';
import Signinmobile from '../Screens/Signinmobile';
import Otpscreen from '../Screens/Otpscreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="Firstscreen" component={Firstscreen} />
          <Stack.Screen name="RiderSignup" component={Ridersignup} />
          <Stack.Screen name="RiderBottom" component={Riderbottomnavigator} />
          <Stack.Screen name="RiderHomescreen" component={Homerider} />
          <Stack.Screen name='Signinmobile' component={Signinmobile}></Stack.Screen>
          <Stack.Screen name='Otp' component={Otpscreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Navigator;
