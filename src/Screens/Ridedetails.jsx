import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { handlePayment } from '../config/Paymentutils';
import { collectCash } from '../config/Paymentutils';
import { Alert } from 'react-native';

import {Box, Text, Button} from 'native-base';
// import io from 'socket.io-client';


const Ridedetails = ({navigation, route}) => {
  const [ride, setRide] = useState(null);
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [toCoordinates, setToCoordinates] = useState(null);
  // const socket = io('http://192.168.1.18:5000');
  const [riderCurrentLoc, setRiderCurrentLoc] = useState({
    latitude: 28.7041, // Initial latitude for Pitampura
    longitude: 77.1025, // Initial longitude for Pitampura
  });
  const {RideId} = route.params;

  useEffect(() => {
    console.log(route.params.RideId);
    const getRidedetails = async () => {
      try {
        const response = await axios.get(
          `https://app-api.ekery.in/api/ride-details/${RideId}`,
        );

        const rideData = response.data;
        setRide(rideData.Ride);
        console.log(response.data);

        setFromCoordinates({
          latitude: rideData.Ride.fromLocCordinate.lat,
          longitude: rideData.Ride.fromLocCordinate.lng,
        });
        setToCoordinates({
          latitude: rideData.Ride.TOLocationcoordinate.lat,
          longitude: rideData.Ride.TOLocationcoordinate.lng,
        });
        console.log('set', fromCoordinates.longitude);
        console.log(toCoordinates);
      } catch (error) {
        console.error(error);
      }
    };
    getRidedetails();
  }, [route.params]);

  const startRide = async () => {
    try {
      await axios.post(`https://app-api.ekery.in/api/start-ride/${RideId}`);
      // socket.emit('rideStatusChange', {RideId: RideId, status: 'started'}); // Emit socket event
      setRide({...ride, status: 'started'}); // Update local state
    } catch (error) {
      console.error(error);
    }
  };

  const reachUser = async () => {
    try {
      await axios.post(`https://app-api.ekery.in/api/reach-user/${RideId}`);
      // socket.emit('rideStatusChange', {RideId: RideId, status: 'arrived'});
      setRide({...ride, status: 'arrived'});
    } catch (error) {
      console.error(error);
    }
  };

  const endRide = async () => {
    try {
      await axios.post(`https://app-api.ekery.in/api/end-ride/${RideId}`);
      // socket.emit('rideStatusChange', {RideId: RideId, status: 'completed'});
      setRide({...ride, status: 'completed'});

      Alert.alert(
        "Collect Payment",
        "Choose payment method:",
        [
          {
            text: "Collect Cash",
            onPress: () => collectCash(RideId, () => {
              console.log('Cash collected successfully');
            }, (error) => {
              console.error('Error collecting cash:', error);
            }),
          },
          {
            text: "Collect via Company",
            onPress: () => handlePayment(ride.fare, (data) => {
              console.log('Payment successful:', data);
              // Save payment details to your backend
              savePaymentDetails(data);
            }, (error) => {
              console.error('Payment failed:', error);
            }),
          }
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error(error);
    }
  };
  console.log(ride);

  if (!fromCoordinates || !toCoordinates) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: riderCurrentLoc.latitude,
          longitude: riderCurrentLoc.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {riderCurrentLoc && (
          <Marker
            coordinate={{
              latitude: riderCurrentLoc.latitude,
              longitude: riderCurrentLoc.longitude,
            }}
            title="Rider"
            description="Rider's current location"
          />
        )}
        {fromCoordinates && (
          <Marker
            coordinate={{
              latitude: fromCoordinates.latitude,
              longitude: fromCoordinates.longitude,
            }}
            title="From"
            description={ride.Fromloc}
          />
        )}
        {riderCurrentLoc && fromCoordinates && ride.status !== 'started' && (
          <MapViewDirections
            origin={riderCurrentLoc}
            destination={fromCoordinates}
            apikey={'AIzaSyCaYAz7FWXDpB4PfqM_eIK6aEje_YT6gcg'}
            strokeWidth={5}
            strokeColor="#E87429"
          />
        )}
        {ride.status === 'started' && toCoordinates && (
          <Marker
            coordinate={{
              latitude: toCoordinates.latitude,
              longitude: toCoordinates.longitude,
            }}
            title="To"
            description={ride.Toloc}
          />
        )}
        {ride.status === 'started' && fromCoordinates && toCoordinates && (
          <MapViewDirections
            origin={fromCoordinates}
            destination={toCoordinates}
            apikey={'AIzaSyCaYAz7FWXDpB4PfqM_eIK6aEje_YT6gcg'}
            strokeWidth={5}
            strokeColor="#E87429"
          />
        )}
      </MapView>

      <Box
        position="absolute"
        bottom={0}
        width="100%"
        bg="white"
        p={4}
        borderTopWidth={1}
        borderTopColor="gray.200">
        <Text fontSize="xl" fontWeight="bold" color="#E87429">
          From:{' '}
          <Text fontWeight="medium" color="#000000" fontSize="md">
            {ride.FromLoc}
          </Text>
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="#E87429">
          To:{' '}
          <Text fontWeight="medium" color="#000000" fontSize="md">
            {ride.Toloc}
          </Text>
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="#E87429">
          Fare:{' '}
          <Text fontWeight="medium" color="#000000" fontSize="md">
            ₹{ride.fare}
          </Text>
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="#E87429">
          Status:{' '}
          <Text fontWeight="medium" color="#000000" fontSize="md">
            ₹{ride.status}
          </Text>
        </Text>
        {ride.status === 'accepted' && (
          <Button
            onPress={reachUser}
            bgColor="#E87429"
            color="white"
            _hover={{bgColor: '#FFA657'}}>
            Reach User
          </Button>
        )}
        {ride.status === 'arrived' && (
          <Button onPress={startRide} bgColor={'#E6712E'}>
            Start Ride
          </Button>
        )}

        {ride.status === 'started' && (
          <Button onPress={endRide} bgColor={'#E6712E'}>
            End Ride
          </Button>
        )}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Ridedetails;
