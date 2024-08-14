import {View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Box, Text, Input, Button, Flex, Pressable} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const Topupscreen = () => {
  const [amount, setAmount] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [riderid, setRiderid] = useState(null);

  useEffect(() => {
    const DetailDriver = async () => {
      const riderid = await AsyncStorage.getItem('riderid');
      setRiderid(riderid);
    };

    DetailDriver();
  }, []);

  const handlePaymentSuccess = async paymentId => {
    try {
      const response = await axios.post(
        'https://app-api.ekery.in/api/Driverwallet/add',
        {
          driverId: riderid,
          amount: amount,
          paymentId: paymentId,
        },
      );
      console.log(response.data);
      Alert.alert('Payment Successful', 'Your payment was successful.');
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Payment Error',
        'There was an error processing your payment. Please try again.',
      );
    }
  };

  const handlePayment = () => {
    const options = {
      description: 'Top up',
      image: 'https://play-lh.googleusercontent.com/dlakhXyS6p4O8Ata49R9danonfIpTLxacieRvLEVYIHuaqM0Hk4Zor8Qd-n3qv40JZvl=w240-h480-rw', // Replace with your logo URL
      currency: 'INR',
      key: 'rzp_live_DwOWAGfeWFBMd3', // Replace with your Razorpay key
      amount: amount * 100, // Razorpay amount is in paise
      name: 'Ekery',
      prefill: {
        userid:userid
      },
      theme: { color: '#000000' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        handlePaymentSuccess(data.razorpay_payment_id);
      })
      .catch((error) => {
        // handle failure
        console.error(error);
        Alert.alert('Payment Cancelled', 'You have cancelled the payment.', [
          { text: 'OK' }
        ]);
      });
  };

  const handleChange = value => {
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setIsValid(Number(value) > 0);
    }
  };

  const handlePresetAmount = value => {
    setAmount(String(value));
    setIsValid(value > 100);
  };
  return (
    <View>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="start"
        alignItems="start"
        backgroundColor="#FFFFFF">
        <Box width="90%" marginX="auto" marginTop="10">
          <Text fontSize="2xl" fontWeight="semibold">
            Enter Top up amount
          </Text>
          <Input
            marginTop="10"
            variant="underlined"
            placeholder="Enter amount"
            fontSize="lg"
            placeholderTextColor="black"
            value={amount}
            onChangeText={handleChange}
            keyboardType="numeric"
          />
        </Box>

        <Flex
          flexDirection={'row'}
          style={{gap: 8}}
          pt={6}
          width="90%"
          marginX="auto">
          
          <Pressable onPress={() => handlePresetAmount(200)}>
            <Box py={2} px={3} backgroundColor={'#E87429'} borderRadius={'full'}>
              <Text color={'white'} fontWeight={800} fontSize={16}>
                + 200
              </Text>
            </Box>
          </Pressable>

          <Pressable onPress={() => handlePresetAmount(500)}>
            <Box py={2} px={3} backgroundColor={'#E87429'} borderRadius={'full'}>
              <Text color={'white'} fontWeight={800} fontSize={16}>
                + 500
              </Text>
            </Box>
          </Pressable>
          
        </Flex>
        <Button
          marginTop="12"
          width="80%"
          marginX="auto"
          borderRadius="full"
          bg="#000000"
          colorScheme="black"
          isDisabled={!isValid}
          onPress={handlePayment}>
          Continue
        </Button>
      </Box>
    </View>
  );
};

export default Topupscreen;
