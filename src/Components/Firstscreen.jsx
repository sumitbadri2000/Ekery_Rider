import {View} from 'react-native';
import React from 'react';
import {Box, Text, Button} from 'native-base';
import {ImageBackground} from 'react-native';

const Firstscreen = ({navigation}) => {
  return (
    <ImageBackground
      width={'100%'}
      height={'100%'}
      source={require('../Assests/firstscreen.png')}>
      <Box
        width={'100%'}
        height={'100%'}
        position={'relative'}
        display={'flex'}
        alignItems={'center'}>
        <Box
          width={'100%'}
          height={'73%'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'absolute'}
          // top={'220'}
          fontFamily={'Signika Negative'}
          color={'#000000'}>
          <Text fontWeight={'500'} fontSize={'4xl'}>
            Welcome to Rider
          </Text>
        </Box>

        <Box
          position={'absolute'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'10%'}
          bottom={'50'}
          width={'100%'}
          fontSize={'2xl'}>
          <Button
            backgroundColor={'#E87429'}
            color={'#FFFFFF'}
            width={'65%'}
            alignSelf={'center'}
            borderRadius={'full'}
            onPress={() => {
              navigation.navigate('RiderSignup');
            }}>
            <Text fontSize={'2xl'} color={'#FFFFFF'} fontWeight={'500'}>
              GET STARTED
            </Text>
          </Button>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default Firstscreen;
