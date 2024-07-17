import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Text,
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  Image,
  Button,
  KeyboardType,
} from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import Navigator from '../Navigation/Navigator';


const Signinmobile = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [value, setValue] = useState(0);
  const [formattedValue, setFormattedValue] = useState('');

  const handleSubmit = async() => {

    console.log(value)
    // try {
    //   const response = await axios.post("http://192.168.1.18:5000/api/send-otp", {
    //     phoneNumber:value
    //   });
    //   console.log(response.data);
    //   const phoneNumber = value;
    //   navigation.navigate('Otp', {phoneNumber});
    // } catch (error) {
    //   console.error(error);
    // }
    const phoneNumber = value;
    navigation.navigate('Otp', {phoneNumber:phoneNumber});
   
  };

  return (
    <Box
      width={'100%'}
      height={'100%'}
      backgroundColor={'#FFFFFF'}
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}>
      <Box height={'30%'} marginTop={'10'} marginX={'auto'} style={{gap:14}}>
        <Text
          color={'#000000'}
          fontSize={'3xl'}
          fontWeight={'500'}
          textAlign={'center'}>
          To Get Started
        </Text>
        <Text
          color={'#000000'}
          fontSize={'2xl'}
          textAlign={'center'}
         >
          Enter Your Mobile number
        </Text>

        <PhoneInput
          containerStyle={{marginHorizontal: 'auto'}}
          defaultValue={value}
          defaultCode="IN"
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />

        <Text
          color={'#000000'}
          fontSize={'xl'}
          textAlign={'center'}
          >
          You will receive OTP on this number
        </Text>
      </Box>

      <Box justifyContent={"center"} position={'absolute'} width={'100%'} height={'20%'} top={'270'}>
        <Button
          backgroundColor={'#E87429'}
          color={'#FFFFFF'}
          width={'65%'}
          alignSelf={'center'}
          borderRadius={'full'}
          onPress={handleSubmit}
          style={{justifyContent: 'center', alignItems: 'center'}} // Added style object
        >
          <Text fontSize={'2xl'} color={'#FFFFFF'} fontWeight={'500'}>
            CONTINUE{' '}
          </Text>
        </Button>
      </Box>

      <Box position={'absolute'} bottom={'2'} width={'100%'} fontSize={'2xl'}>
        <Text
          textAlign={'center'}
          color={'#000000'}
          fontWeight={'400'}
          fontSize={'md'}>
          Continuing means you agree with our
        </Text>
        <Text
          textAlign={'center'}
          color={'#000000'}
          fontWeight={'400'}
          fontSize={'md'}>
          Terms and Conditions and Privacy Policy
        </Text>
      </Box>
    </Box>
  );
};

export default Signinmobile;
