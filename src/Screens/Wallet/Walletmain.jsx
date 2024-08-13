import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Walletmain = ({ navigation }) => {
  const [riderid, setRiderid] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const DetailDriver = async () => {
      const driverid = await AsyncStorage.getItem('driverid');
      setRiderid(driverid);
    };

    DetailDriver();
  }, []);

  console.log(riderid + "ghg")

  const getPayment = async () => {
    if (riderid) {
      try {
        const response = await axios.get(`https://app-api.ekery.in/api/Driverwallet/balance/${riderid}`);
        console.log(response.data);
        setAmount(response.data.walletBalance);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getPayment();
  }, [riderid]); // Only run this effect when riderid changes

  return (
 
      <Box style={styles.container}>
        <TouchableOpacity style={styles.refreshButton} onPress={getPayment}>
          <Icon as={MaterialIcons} name="refresh" size="lg" color="white" />
        </TouchableOpacity>
        
        <Box backgroundColor={'#F0F0F0'} width={'100%'} height={'48'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
<Box width={'80%'} marginX={'auto'} >

<Text color={'#000000'}>Balance</Text>
<Text color={'#000000'} fontSize={'2xl'} marginTop={'1'} fontWeight={'500'}>₹ {amount}</Text>

<Text color={'#000000'} marginTop={'5'}>Deposit</Text>
<Text color={'#000000'}>₹ 0.00</Text>




</Box>

</Box>

        <Box style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => { navigation.navigate('Topup') }} style={styles.actionButton}>
            <Flex style={styles.flex}>
              <Image source={require('../../Assests/wallet/icon1.png')} alt='Top Up' style={styles.icon} />
              <Text style={styles.actionText}>Top Up</Text>
            </Flex>
            <MaterialIcons name="arrow-forward-ios" size={25} color={'#000000'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate('Cashout') }} style={styles.actionButton}>
            <Flex style={styles.flex}>
              <Image source={require('../../Assests/wallet/icon2.png')} alt='Cash Out' style={styles.icon} />
              <Text style={styles.actionText}>Cash Out</Text>
            </Flex>
            <MaterialIcons name="arrow-forward-ios" size={25} color={'#000000'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate('Balancedetails' ,{
            riderid:riderid
          })}>
            <Flex style={styles.flex}>
              <Image source={require('../../Assests/wallet/icon3.png')} alt='Balance Detail' style={styles.icon} />
              <Text style={styles.actionText}>Balance Detail</Text>
            </Flex>
            <MaterialIcons name="arrow-forward-ios" size={25} color={'#000000'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Flex style={styles.flex}>
              <Image source={require('../../Assests/wallet/icon4.png')} alt='Bank Details' style={styles.icon} />
              <Text style={styles.actionText}>Bank Details</Text>
            </Flex>
            <MaterialIcons name="arrow-forward-ios" size={25} color={'#000000'} />
          </TouchableOpacity>
        </Box>
      </Box>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  refreshButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  balanceContainer: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceInnerContainer: {
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
  },
  balanceAmount: {
    color: '#000000',
    fontSize: 24,
    marginTop: 5,
    fontWeight: '500',
  },
  actionsContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButton: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  flex: {
    width: '64%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Walletmain;
