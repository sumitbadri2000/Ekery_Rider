import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  NativeBaseProvider,
  Text,
  Image,
  Button,
  ScrollView,
  Flex,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {io} from 'socket.io-client';
const socket = io('https://app-api.ekery.in/');

const Homerider = ({navigation}) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [driverid, setDriverId] = useState('');

  useEffect(() => {
    const getStorageData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedDriverId = await AsyncStorage.getItem('driverid');
        console.log(storedDriverId + ' cihjgjh');
        setName(storedName || '');
        setDriverId(storedDriverId || '');
      } catch (error) {
        console.error('Failed to fetch storage data', error);
      }
    };

    const getrides = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://app-api.ekery.in/api/pending-rides',
        );
        console.log(response.data);
        setLoading(false);
        setRides(response.data);
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };

    getrides();
    getStorageData();
  }, []);

  const acceptRide = async Rideid => {
    try {
      console.log('check', driverid, Rideid);
      const response = await axios.post(
        `https://app-api.ekery.in/api/accept-ride/${Rideid}`,
        {Riderid: driverid},
        console.log(response, 'accepts data'),
      );
      if (response.status === 200) {
        navigation.navigate('Ridedetails', {RideId: Rideid});
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formatTime = timestamp => {
    if (!timestamp) return 'Invalid time';

    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid time';
    }

    const hours = date.getHours().toString().padStart(2, '0'); // Local time
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
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
            <Text fontSize={16} color={'#FFFFFF'} textAlign={'center'}>
              Requested Trip
            </Text>

            <Box ml={20}>
              <Icon2 name={'refresh'} size={40} color={'white'} />
            </Box>
          </Box>

          {loading ? (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            rides.map((ride, index) => (
              <Box
                key={index}
                width={'95%'}
                borderWidth={'1'}
                marginX={'auto'}
                padding={'3'}
                borderRadius={'md'}
                backgroundColor={'#EDEEF0'}
                marginTop={'4'}>
                <Flex
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Box width={'40%'}>
                    <Text fontSize={'xl'} fontWeight={'600'}>
                      From
                    </Text>
                    <Text fontSize={'sm'}>{ride.FromLoc}</Text>

                    <Text fontSize={'sm'} fontWeight={'600'}>
                      Building :
                      <Text fontWeight={'400'} marginTop={'6'}>
                        {ride.fromBuildingname}
                      </Text>{' '}
                    </Text>
                    <Text fontSize={'sm'} fontWeight={'600'}>
                      Floor:
                      <Text fontWeight={'400'} marginTop={'6'}>
                        {ride.fromFloor}
                      </Text>
                    </Text>


                  </Box>

                  <Icons name="arrow-switch" size={25} color="#108943" />

                  <Box width={'40%'}>
                    <Text fontSize={'xl'} fontWeight={'600'}>
                      To
                    </Text>
                    <Text fontSize={'sm'}>{ride.Toloc}</Text>
                    <Text fontSize={'sm'} fontWeight={'600'}>
                      Building :
                      <Text fontWeight={'400'} marginTop={'6'}>
                        {ride.ToBuildingname}
                      </Text>{' '}
                    </Text>
                    <Text fontSize={'sm'} fontWeight={'600'}>
                      Floor:
                      <Text fontWeight={'400'} marginTop={'6'}>
                        {ride.Tofloor}
                      </Text>
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  flexDirection={'row'}
                  marginTop={'15'}
                  justifyContent={'space-between'}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'row'}>
                    <Icon1 name="clock" size={25} />
                    <Text>{formatTime(ride.updatedAt)}</Text>
                  </Box>

                  <Text fontSize={'sm'} fontWeight={'600'}>
                      Fare :
                      <Text fontWeight={'400'} marginTop={'6'}>
                        {ride.fare}
                      </Text>{' '}
                    </Text>

                  <Box
                    display={'flex'}
                    style={{elevation: 2}}
                    background={'#FFFFFF'}
                    paddingX={'4'}
                    borderRadius={'2'}>
                    <Text>{ride.Inside}</Text>
                  </Box>
                </Flex>

                <Button
                  marginTop={'4'}
                  bgColor={'#E6712E'}
                  width={'60%'}
                  onPress={() => acceptRide(ride._id)}
                  mb={4}
                  alignSelf={'center'}>
                  Accept ride
                </Button>
              </Box>
            ))
          )}
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Homerider;
