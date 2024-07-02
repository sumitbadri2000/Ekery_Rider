import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider} from 'native-base';
import RiderNavigation from './RiderNavigation';
import RiderProfile from '../Screens/RiderProfile';
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
            tabBarLabel: 'Home',
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
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </RiderTab.Navigator>
    </NativeBaseProvider>
  );
};

export default Riderbottomnavigator;
