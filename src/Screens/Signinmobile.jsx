import {Linking, TouchableWithoutFeedback, View} from 'react-native';
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
  Flex,
  Spinner
} from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import Navigator from '../Navigation/Navigator';
import Otpscreen from './Otpscreen';
import {setphonenumber} from '../redux/actions/useractions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Signinmobile = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [exitUser, setExitUser] = useState('');
  const [value, setValue] = useState(0);
  const [formattedValue, setFormattedValue] = useState('');
  const [loader , setLoader] = useState(false)


  console.log(value)
  const handleSubmit = async () => {

    // setLoader(true)
    // try {
    //   const number = '+91' + value;

    //   const response = await axios.post(
    //     'http://192.168.1.18:5000/api/users/send-otp',
    //     {
    //       phoneNumber: number,
    //     },
    //   );
    //   console.log(response.data)
    //   if(response.data.success){
    //     navigation.navigate('Otp', {phoneNumber: value });
    //     setLoader(false)
    //   }
    //   else{
    //     Alert.alert('Error', 'Error in sending otp , Please try again', [
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //       },
    //       {text: 'OK', onPress: () => setLoader(false)},
    //     ]);
    //   }


      
    // } catch (error) {
    //   Alert.alert('Error', 'Error in sending otp , Please try again', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => setLoader(false)},
    //   ]);

    //   console.error(error);
    // }
    
    navigation.navigate('Otp', {phoneNumber: value });

  };

  return (
    <Box
      width={'100%'}
      height={'100%'}
      backgroundColor={'#FFFFFF'}
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}>
      <Box height={'30%'} marginTop={'5'} marginX={'auto'} style={{gap: 14}}>
        <Text
          color={'#000000'}
          fontSize={'3xl'}
          fontWeight={'500'}
          textAlign={'center'}>
          To Get Started
        </Text>
        <Text color={'#000000'} fontSize={'2xl'} textAlign={'center'}>
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

      <Box
        justifyContent={'center'}
        position={'absolute'}
        width={'100%'}
        height={'20%'}
        top={'270'}>
     <Button
      backgroundColor={'#E87429'}
      color={'#FFFFFF'}
      width={'65%'}
      alignSelf={'center'}
      borderRadius={'full'}
      onPress={handleSubmit}
      
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      {loader ? (
        <Spinner color={'white'} size={'lg'}/>
      ) : (
        <Text fontSize={'2xl'} color={'#FFFFFF'} fontWeight={'500'}>
          CONTINUE
        </Text>
      )}
    </Button>
      </Box>

      <Box position={'absolute'} bottom={'3'} width={'100%'} fontSize={'2xl'}>
        <Text
          textAlign={'center'}
          color={'#000000'}
          fontWeight={'400'}
          fontSize={'md'}>
          Continuing means you agree with our
        </Text>
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          style={{gap: 5}}>
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL('https://en.wikipedia.org/wiki/Wi-Fi')
            }>
            <Text
              textAlign={'center'}
              color={'blue.400'}
              fontWeight={'400'}
              textDecorationLine={'underline'}
              fontSize={'md'}>
              Terms and Conditions
            </Text>
          </TouchableWithoutFeedback>

          <Text>and </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL('https://en.wikipedia.org/wiki/Wi-Fi')
            }>
            <Text
              textAlign={'center'}
              color={'blue.400'}
              textDecorationLine={'underline'}
              fontWeight={'400'}
              fontSize={'md'}>
              Privacy Policy
            </Text>
          </TouchableWithoutFeedback>
        </Flex>
      </Box>
    </Box>
  );
};

export default Signinmobile;
