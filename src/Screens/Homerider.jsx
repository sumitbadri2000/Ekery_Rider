import {ActivityIndicator, View} from 'react-native';
import React, {createFactory, useEffect, useState} from 'react';
import {
  Box,
  HStack,
  NativeBaseProvider,
  VStack,
  Text,
  Image,
  Divider,
  Button,
  ScrollView,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homerider = ({navigation}) => {
  const [rides, setRides] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    setName(name);
  };

  useEffect(() => {
    const getrides = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://192.168.1.10:5000/api/all-rides',
        );
        console.log(response.data);
        setLoading(false);
        setRides(response.data);
        console.log(rides);
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };

    getrides();
    getName();
  }, []);

  const acceptRide = async Rideid => {
    try {
      const response = await axios.post(
        `http://192.168.1.10:5000/api/accept-ride/${Rideid}`,
        {Riderid: 'Madan-2204'},
      );
      if (response.status == 200) {
        navigation.navigate('Ridedetails', {RideId: Rideid});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView backgroundColor={'#FFFFFF'}>
        <Box width={'100%'} backgroundColor={'#FFFFFF'}>
          <Box width={'50%'}>
            <Text marginLeft={'5'} fontSize={'3xl'} fontWeight={'semibold'}>
              Hi {name}
            </Text>
          </Box>

          <Box
            width={'100%'}
            background={'#E6712E'}
            height={'16'}
            marginTop={'4'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            position={'relative'}
            flexDirection={'row'}>
            <Image
              source={require('../Assests/parcellogo.png')}
              position={'absolute'}
              left={'3'}
              marginLeft={'3'}></Image>
            <Text fontSize={'2xl'} color={'#FFFFFF'} textAlign={'center'}>
              Requested Trip
            </Text>
          </Box>

          {loading ? (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            rides.map((ride, index) => (
              <Box
                key={index}
                width={'100%'}
                maxHeight={'64'}
                marginTop={'5'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}>
                <Box
                  width={'90%'}
                  marginX={'auto'}
                  height={'90%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  position={'relative'}>
                  <Box width={'30%'}>
                    <Text fontSize={'lg'}>From</Text>
                    <Text
                      fontSize={'xs'}
                      width={'100%'}
                      fontWeight={'600'}
                      marginTop={'1'}>
                      {ride.Toloc}
                    </Text>
                    <Box
                      backgroundColor={'#000000'}
                      width={'100%'}
                      borderRadius={'2xl'}
                      marginTop={'2'}>
                      <Text
                        textAlign={'center'}
                        fontSize={'xl'}
                        fontWeight={'semibold'}
                        color={'#FFFFFF'}
                        marginX={'1.5'}>
                        ₹{ride.fare}
                      </Text>
                    </Box>
                  </Box>

                  <Image
                    source={require('../Assests/bothsidedarrow.png')}
                    alignSelf={'center'}
                    alt="img"
                    position={'absolute'}
                    left={'50%'}></Image>

                  <Box width={'30%'}>
                    <Text fontSize={'lg'}>TO</Text>
                    <Text fontSize={'xs'} fontWeight={'600'} marginTop={'1'}>
                      {ride.Toloc}
                    </Text>
                  </Box>
                </Box>

                <Button
                  bgColor={'#E6712E'}
                  onPress={() => acceptRide(ride._id)}
                  mb={4}>
                  Accept ride
                </Button>
                <Divider width={'93%'} marginX={'auto'} />
              </Box>
            ))
          )}
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Homerider;
