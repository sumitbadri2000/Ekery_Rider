import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, FlatList } from 'native-base'
import axios from 'axios'
import moment from 'moment'; // Import moment for date formatting
import { Text  } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'


const Balancedetails = ({navigation ,route}) => {

    const {riderid} = route.params
    const [transaction , setTransaction] = useState([])
    console.log(riderid)

    const renderItem = ({item}) =>(
        <Box width={'90%'} height={'32'} borderColor={'black'} marginX={'auto'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} paddingX={'4'}>

            <Box>
            <Text> {moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</Text>

<Text fontWeight={'600'} fontSize={'2xl'} color={'#333333'}>{item.type}</Text>

<Text>{item._id}</Text>
            </Box>

            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Text fontSize={'2xl'} fontWeight={'500'}>₹{item.amount}</Text>
                <Icon name='arrow-forward-ios' size={20} color={'#000000'} style={{marginLeft:2}}></Icon>

            </Box>
            

        </Box>
    )

    const getData = async() =>{
        try{
            console.log(riderid)

            const response = await axios.get(`https://app-api.ekery.in/api/Driverwallet/transactions/${riderid}`)
            console.log(response.data)
            setTransaction(response.data)

        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        getData()
    },[])


  return (
    <Box backgroundColor={'#FFFFFF'} minHeight={'100%'}>

   <FlatList
   data={transaction}
   renderItem={renderItem}>
    

   </FlatList>
   </Box>

  )
}

export default Balancedetails