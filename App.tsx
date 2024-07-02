import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import Navigator from './src/Navigation/Navigator';



const theme = extendTheme({
  fontConfig: {
    Calibri: {
      regular: {
        fontFamily: 'Calibri',
      },
    },
  },
  fonts: {
    body: 'Calibri',
    heading: 'Calibri',
    mono: 'Calibri',
  },
});




const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigator />
    </NativeBaseProvider>
  );
};

export default App;