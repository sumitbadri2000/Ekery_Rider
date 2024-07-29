import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Divider, Text } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList , Flex } from 'native-base';
import Icons from 'react-native-vector-icons/Octicons'
import Icon1 from 'react-native-vector-icons/Feather'



const Record = ({navigation}) => {
  const [driverId, setDriverId] = useState(null);
  const [completed, setCompleted] = useState([]);

  const getDriverId = async () => {
    try {
      const storedDriverId = await AsyncStorage.getItem('driverid');
      setDriverId(storedDriverId);
    } catch (error) {
      console.error('Failed to fetch driver ID', error);
    }
  };

  const getCompletedRides = async () => {
    try {
      const response = await axios.post(`http://192.168.1.18:5000/api/get-rides/${driverId}`);
      setCompleted(response.data);
    } catch (error) {
      console.error('Failed to fetch completed rides', error);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    
    // Array of day names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Format day, date, and time
    const day = dayNames[date.getDay()];
    const formattedDate = date.toLocaleDateString(); // e.g., "07/22/2024"
    const formattedTime = date.toLocaleTimeString(); // e.g., "12:30:00 PM"
  
    return `${day}, ${formattedDate}, ${formattedTime}`;
  };

  useEffect(() => {
    getDriverId();
  }, []);

  useEffect(() => {
    if (driverId) {
      getCompletedRides();
    }
  }, [driverId]);

 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{handlePress(item)}}> 
    <Box width={'100%'} marginBottom={'4'} marginTop={'5'}>
        <Divider orientation='horizontal' width={'100%'}></Divider>
        <Box width={'90%'} marginX={'auto'}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} marginTop={'3'}>
        <Text fontSize={'md'} fontWeight={'600'}>
          {formatDateTime(item.updatedAt)}
        </Text>
        <Text fontSize={'md'} fontWeight={'600'}>
          ₹{item.fare}
        </Text>
      </Box>
      <Text>{item.Inside}</Text>
      <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Box width={'40%'}>
                <Text fontSize={'md'} fontWeight={'600'} >From</Text>
                <Text fontSize={'sm'} color={'rgba(0, 0, 0, 0.6)'}>{item.FromLoc}</Text>
                </Box>

                <Icons name='arrow-switch' size={25} color="#108943"></Icons>

                <Box width={'40%'} >
                <Text fontSize={'md'} fontWeight={'600'} >To</Text>
                <Text fontSize={'sm'} color={'rgba(0, 0, 0, 0.6)'}>{item.Toloc}</Text>
                </Box>


              </Flex>

<Flex flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
<Box  borderWidth={'1'} paddingX={'4'} paddingY={'1'} borderRadius={'md'} borderColor={'rgba(0, 0, 0, 0.6)'} backgroundColor={'#EDEEF0'}>
            <Text fontSize={'md'} color={'#108943'}>{item.paymentStatus}</Text>
        </Box> 

        <Box display={'flex'} alignItems={'center'} flexDirection={'row'} >
            <Text>Check Info</Text>
            <Icon1 name='info' size={22} color="#000000" style={{marginLeft:4}}></Icon1>

        </Box>

</Flex>
          
        </Box>
     
      
    </Box>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    navigation.navigate('PayDetails', { ride: item });
  };


  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} backgroundColor={'#FFFFFF'}>
      <FlatList
        data={completed}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
        style={{width:'100%' , marginHorizontal:'auto'}}
        />
    </Box>
  );
};

export default Record;
