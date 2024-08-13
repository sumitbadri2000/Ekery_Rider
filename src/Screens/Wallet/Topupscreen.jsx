import { View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button } from 'native-base';
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

  const handlePaymentSuccess = async (paymentId) => {
    try {
      const response = await axios.post("https://app-api.ekery.in/api/Driverwallet/add", {
        driverId: riderid,
        amount: amount,
        paymentId: paymentId,
      });
      console.log(response.data);
      Alert.alert('Payment Successful', 'Your payment was successful.');
    } catch (error) {
      console.error(error);
      Alert.alert('Payment Error', 'There was an error processing your payment. Please try again.');
    }
  };

  const handlePayment = () => {
    const options = {
      description: 'Wallet Top-up',
      image: 'https://taxisure.co/wp-content/uploads/2024/03/taxi_sure__4_-removebg-preview.png', // Replace with your logo URL
      currency: 'INR',
      key: 'rzp_live_hfAQTM2pl9qyV7', // Replace with your Razorpay key
      amount: amount * 100, // Razorpay amount is in paise
      name: 'Taxisure',
      prefill: {
        riderid: riderid
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
        Alert.alert('Payment Failed', 'Your payment could not be completed. Please try again.');
      });
  };

  const handleChange = (value) => {
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setIsValid(Number(value) > 100);
    }
  };

  return (
    <View>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="start"
        alignItems="start"
        backgroundColor="#FFFFFF"
      >
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
        <Button
          marginTop="12"
          width="80%"
          marginX="auto"
          borderRadius="full"
          bg="#000000"
          colorScheme="black"
          isDisabled={!isValid}
          onPress={handlePayment}
        >
          Continue
        </Button>
      </Box>
    </View>
  );
};

export default Topupscreen;
