import {View} from 'react-native';
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

const Otpscreen = ({route, navigation}) => {
  const {phoneNumber} = route.params;

  const otpInputRef = useRef(null); // Create a ref to store the OTPTextInput component
  const [otpinput, setOtpinput] = useState('');

  const getOTPValue = () => {
    if (otpInputRef.current) {
      return otpInputRef.current.getValue(); // Access the value using the ref
    }
    return ''; // Return empty string if ref is not yet initialized
  };

  const handleOtpChange = otpValue => {
    setOtpinput(otpValue);
    console.log("fgfgfg",otpValue);
  };


  const handleSubmit = async () => {
    console.log(otpinput);

    // try {
    //   const response = await axios.post(
    //     'https://app-api.taxisure.co/api/users/verify-otp',
    //     {
    //       phoneNumber: '+91' + phoneNumber,
    //       otpCode: otpinput,
    //       verifySid: 'VA16f0205c08f2fe1258b7b720cabb5911',
    //     },
    //   );

      // console.log(response.data);

      // if (response.data.success == true) {
        navigation.navigate('RiderSignup', {
          phoneNumber: phoneNumber,
        });
      // } else {
      //   Alert.alert('something went wrong');
      // }
    // } catch (error) {
    //   console.error(error);
    //   Alert('something went wrong');
    // }


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

      <Button
      marginTop={'10'}
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

      <Box paddingX={'8'} paddingY={'3'} borderColor={'dark.400'} borderWidth={'1'} borderRadius={'full'} marginTop={'8'}>
        <Text>Send via 
          <Text color={'green.700'}> WhatsApp</Text>
        </Text>
      </Box>

      <Box position={'absolute'} bottom={'14'} width={'100%'} fontSize={'2xl'}>
        <Text
          textAlign={'center'}
          color={'#000000'}
          fontWeight={'400'}
          fontSize={'md'}>
          Don’t receive OTP?
          <Text fontWeight={'bold'} color={"black"}> Resend OTP</Text>{' '}
        </Text>
      </Box>

      
    </Box>
  );
};

export default Otpscreen;
