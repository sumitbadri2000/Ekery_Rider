import {View, Button} from 'react-native';
import React from 'react';
import {NativeBaseProvider, Text, Box, Image} from 'native-base';

import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgLogo from '../Assests/logo.svg';


const Splashscreen = ({navigation}) => {
  useEffect(() => {
    const checkData = async () => {
      const isRider = await AsyncStorage.getItem('isDriverSignup');
      console.log('rier', isRider);
      const timer = setTimeout(() => {
        if (isRider == 'true') {
          navigation.navigate('RiderBottom');
        } else {
          navigation.navigate('Firstscreen');
        }
      }, 2000);

      return () => clearTimeout(timer);
    };
    checkData();
  }, []);

  return (
    <NativeBaseProvider>
      <Box
        width={'100%'}
        height={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}>
 <SvgLogo width={200} height={200} />
       </Box>
    </NativeBaseProvider>
  );
};

export default Splashscreen;
