// utils/paymentUtils.js
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

// Function to handle Razorpay payment
export const handlePayment = async (amount, onSuccess, onFailure) => {
  const options = {
    description: 'Ride Payment',
    image: 'https://play-lh.googleusercontent.com/dlakhXyS6p4O8Ata49R9danonfIpTLxacieRvLEVYIHuaqM0Hk4Zor8Qd-n3qv40JZvl=w240-h480-rw',
    currency: 'INR',
    key: 'rzp_live_DwOWAGfeWFBMd3',
    amount: amount * 100,
    name: 'Ekery',
    prefill: {
      email: 'user_email@example.com',
      contact: 'user_contact_number',
      name: 'User Name',
    },
    theme: { color: '#E87429' },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      // Payment successful
      console.log(data);
      if (onSuccess) onSuccess(data);
    })
    .catch((error) => {
      // Payment failed
      console.error(error);
      if (onFailure) onFailure(error);
    });
};

// Function to handle cash collection
export const collectCash = async (rideId, onSuccess, onFailure) => {
  try {
    await axios.post(`http://192.168.1.18:5000/api/collect-cash/${rideId}`);
    // On success, update state or perform other actions
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error(error);
    if (onFailure) onFailure(error);
  }
};
