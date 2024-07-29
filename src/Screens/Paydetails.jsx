import { View } from 'react-native'
import React from 'react'
import { Box, Heading , Text , Button } from 'native-base'
import RazorpayCheckout from 'react-native-razorpay';

const Paydetails = ({navigation , route}) => {

    const { ride } = route.params; // Get ride data from params
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        
        // Array of day names
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        // Format day, date, and time
        const day = dayNames[date.getDay()];
        const formattedDate = date.toLocaleDateString(); // e.g., "07/22/2024"
        const formattedTime = date.toLocaleTimeString(); // e.g., "12:30:00 PM"
      
        return ` ${formattedDate}, ${formattedTime}`;
      };

const Paynow = ()=>{
    const options = {
        description: 'Ride Payment',
        image: 'https://play-lh.googleusercontent.com/dlakhXyS6p4O8Ata49R9danonfIpTLxacieRvLEVYIHuaqM0Hk4Zor8Qd-n3qv40JZvl=w240-h480-rw',
        currency: 'INR',
        key: 'rzp_live_DwOWAGfeWFBMd3',
        amount: ride.companyCommission * 100,
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
          
        })
        .catch((error) => {
          // Payment failed
          console.error(error);
         
        });


}
    

  return (
   <Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'start'} background={'#FFFFFF'}>
    <Heading textAlign={'center'}>
        Breakdown
    </Heading>

<Box width={'90%'} marginX={'auto'}>
    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} marginTop={'3'} >
        <Box>
        <Text fontSize={'lg'} fontWeight={'600'}>
          Total fare
        </Text>
        <Text fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
          Delivery Fee
        </Text>
        </Box>
        <Box >
        <Text fontSize={'sm'} fontWeight={'600'}>
          ₹{ride.fare}
        </Text>
        <Text textAlign={'end'} fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
        ₹{ride.fare}
        </Text>
        </Box>
       
      </Box>

    


      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} marginTop={'3'} alignItems={'center'}>
        <Box>
        <Text fontSize={'lg'} fontWeight={'600'}>
          Commission
        </Text>
        <Text fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
        Commission
        </Text>
        </Box>
        <Box >
        <Text fontSize={'sm'} fontWeight={'600'}>
          ₹{ride.companyCommission}
        </Text>
        <Text textAlign={'end'} fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
        ₹{ride.companyCommission}
        </Text>
        </Box>
       
      </Box>


      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} marginTop={'3'} alignItems={'center'}>
        <Box>
        <Text fontSize={'lg'} fontWeight={'600'}>
          Payment status
        </Text>
        <Text fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
          Payment status
        </Text>
        </Box>
        <Box >
        <Text fontSize={'sm'} fontWeight={'600'}>
          {ride.paymentStatus}
        </Text>
        <Text textAlign={'end'} fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
        {ride.paymentStatus}
        </Text>
        </Box>
       
      </Box>

      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} marginTop={'3'} alignItems={'center'}>
        <Box width={'45%'}>
        <Text fontSize={'lg'} fontWeight={'600'}>
          Payment deadline
        </Text>
        <Text fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
          Payment deadline
        </Text>
        </Box>
        <Box width={'48%'}>
        <Text fontSize={'sm'} fontWeight={'600'}>
        {formatDateTime(ride.paymentDeadline)}
        </Text>
        <Text textAlign={'end'} fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
        {formatDateTime(ride.paymentDeadline)}
        </Text>
        </Box>
       
      </Box>

     
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} marginTop={'3'} alignItems={'center'}>
        <Box >
        <Text fontSize={'lg'} fontWeight={'600'}>
          Total earning
        </Text>
        <Text fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
        Total earning
        </Text>
        </Box>
        <Box >
        <Text fontSize={'sm'} fontWeight={'600'}>
        ₹{ride.fare-ride.companyCommission} 
        </Text>
        <Text textAlign={'end'} fontSize={'sm'} color={'rgba(0,0,0,0.6)'} fontWeight={'400'}>
        ₹{ride.fare-ride.companyCommission} 
        </Text>
        </Box>
       
      </Box>

   </Box>

<Button marginTop={'5'} width={'80%'} marginX={'auto'} borderRadius={'full'} bg={'#E6712E'} onPress={Paynow}> Pay Now</Button>   </Box>
  )
}

export default Paydetails