import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider} from 'native-base';
import RiderNavigation from './RiderNavigation';
import RiderProfile from '../Screens/RiderProfile';
import Record from '../Screens/Record';
import Recordnavigator from './Recordnavigator';
import Walletmain from '../Screens/Wallet/Walletmain';
import Walletnavigation from './Walletnavigation';
const RiderTab = createBottomTabNavigator();

const Riderbottomnavigator = () => {
  return (
    <NativeBaseProvider>
      <RiderTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}>
        <RiderTab.Screen
          name="Homerider"
          component={RiderNavigation}
          options={{
            headerShown: false,
            tabBarLabel: 'Active Rides',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <RiderTab.Screen
          name="Portfolio"
          component={RiderProfile}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="account-circle" color={color} size={size} />
            ),
          }}
        />

<RiderTab.Screen
          name="records"
          component={Recordnavigator}
          options={{
            headerShown: false,
            tabBarLabel: 'Record',
            tabBarIcon: ({color, size}) => (
              <Icons name="folder-information-outline" color={color} size={size} />
            ),
          }}
        />
         <RiderTab.Screen
        name='Wallet'
        component={Walletnavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Wallet',
          tabBarIcon: ({color, size}) => (
            <Icons name="account-balance-wallet" color={color} size={size} />
          ),
        }}/>
      </RiderTab.Navigator>
    </NativeBaseProvider>
  );
};

export default Riderbottomnavigator;
