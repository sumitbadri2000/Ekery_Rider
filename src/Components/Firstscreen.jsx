import {View} from 'react-native';
import React from 'react';
import {Box, Text, Button} from 'native-base';
import {ImageBackground} from 'react-native';

const Firstscreen = ({navigation}) => {
  return (
    <ImageBackground
      width={'100%'}
      height={'100%'}
      resizeMode='stretch'
      source={require('../Assests/first.png')}>
      <Box
        width={'100%'}
        height={'100%'}
        position={'relative'}
        display={'flex'}
        alignItems={'center'}>
        {/* <Box
          width={'100%'}
          height={'50%'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'absolute'}
          // top={'220'}
          // fontFamily={'Signika Negative'}
          color={'#000000'}
          >
          <Text fontWeight={'500'} fontSize={'4xl'} >
            Logistic on two wheels
          </Text>
          <Text textAlign={'center'} fontSize={'2xl'}>
            easy way to deliver
          </Text>
        </Box> */}

        <Box
          position={'absolute'}
          alignItems={"center"}
          justifyContent={"center"}
          height={"15%"}
          bottom={'3'}
          width={'100%'}
          fontSize={'2xl'}>
          <Button
            bg={'#E87429'}
            color={'#FFFFFF'}
            width={'65%'}
            alignSelf={'center'}
            borderRadius={'full'}
            colorScheme={'black'}
            onPress={() => {
              navigation.navigate('Signinmobile');
            }}>
            <Text fontSize={'2xl'} color={'#FFFFFF'} fontWeight={'600'}>
              GET STARTED
            </Text>
          </Button>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default Firstscreen;
