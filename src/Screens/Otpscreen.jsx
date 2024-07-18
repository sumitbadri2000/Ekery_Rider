import {View , Alert} from 'react-native';
import React, { useState } from 'react';
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
import OTPTextInput from 'react-native-otp-textinput';
import {useRef} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Otpscreen = ({route, navigation}) => {
  const {phoneNumber} = route.params;
  console.log("psh",phoneNumber)

  const otpInputRef = useRef(null); 
  const [otpinput, setOtpinput] = useState('');

  const getOTPValue = () => {
    if (otpInputRef.current) {
      return otpInputRef.current.getValue(); 
    }
    return ''; 
  };

  const handleOtpChange = otpValue => {
    setOtpinput(otpValue);
    console.log("fgfgfg",otpValue);
  };
  const handledriversignup = async() =>{

    try{
      const response = await axios.post("http://192.168.1.18:5000/api/driver/check-driver" , {
        phoneNumber:91+phoneNumber
      })
      console.log(response.data)
      if(response.data.exists){
        navigation.navigate('Riderbottomnavigator')
      }
      else{
        navigation.navigate('RiderSignup',{
          phoneNumber:phoneNumber
        })
      }
    }
    catch(error){
      console.error(error)
    }



  }



  const handleSubmit = async () => {
    console.log(otpinput);

    try {
      const response = await axios.post(
        'http://192.168.1.18:5000/api/users/verify-otp',
        {
          phoneNumber: '+91' + phoneNumber,
          otpCode: otpinput,
          verifySid: 'VA9678bd61293bb3b15dc8c3c2cf0bcb02',
        },
      );

      console.log(response.data);

      if (response.data.success == true) {
        handledriversignup()
      } else {
        Alert.alert('something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert('something went wrong');
    }
 


  };

 




  return (
    <Box
      width={'100%'}
      height={'100%'}
      backgroundColor={'#FFFFFF'}
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}>
      <Box height={'30%'} marginTop={'10'}>
        <Text
          color={'#000000'}
          fontSize={'3xl'}
          fontWeight={'500'}
          textAlign={'start'}
          marginLeft={'5'}>
          Enter OTP

        </Text>

        <Text
          color={'#000000'}
          fontSize={'xl'}
          textAlign={'start'}
          marginTop={'3'}
          marginLeft={'5'}>
          The OTP was send to {phoneNumber}
        </Text>

        <OTPTextInput inputCount={6} ref={e => (this.otpInput = e)}  handleTextChange={handleOtpChange} />
      </Box>

      <Box position={'absolute'} width={'100%'} height={'20%'} top={'220'}>
        <Button
          backgroundColor={'#E87429'}
          color={'#FFFFFF'}
          width={'75%'}
          alignSelf={'center'}
          borderRadius={'full'}
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={handleSubmit}>
          <Text fontSize={'2xl'} color={'#FFFFFF'} fontWeight={'600'}>
            Verify OTP{' '}
          </Text>
        </Button>
      </Box>

      <Box position={'absolute'} bottom={'14'} width={'100%'} fontSize={'2xl'}>
        <Text
          textAlign={'center'}
          color={'#000000'}
          fontWeight={'400'}
          fontSize={'md'}>
          Don’t receive OTP?
          <Text fontWeight={'bold'} color={"black"} onPress={()=> navigation.goBack()} > Resend OTP</Text>{' '}
        </Text>
      </Box>

   
    </Box>
  );
};

export default Otpscreen;
