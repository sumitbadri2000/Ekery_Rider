import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Text,
  Stack,
  Input,
  Button,
  Image,
  ScrollView,
  Flex,
  Divider,
  Spinner,
} from 'native-base';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';

const BankDetails = () => {
  const [Pancard, setPancard] = useState('');
  const [Name, setName] = useState('');
  const [AccountNo, setAccountNo] = useState('');
  const [Iffs, setIffs] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Pancard:', Pancard);
    console.log('Name:', Name);
    console.log('AccountNo:', AccountNo);
    console.log('IFSC:', Iffs);
  };

  return (
    <ScrollView backgroundColor="#F3F4F6" height={'100%'} width={'100%'}>
      <Box
        width="90%"
        height={"100%"}
        margin={'auto'}
        bg="#FFFFFF"
        borderRadius="lg"
        shadow="2"
        padding="6"
        marginTop="10">
        <Stack space={6} width="100%" mx="auto">
          <Text
            color="#1E293B"
            fontSize={20}
            textAlign="center"
            fontWeight="bold">
            Bank Details Rider
          </Text>
          <Input
            variant="outline"
            placeholder="Name"
            value={Name}
            onChangeText={text => setName(text)}
            width="100%"
            marginTop="4"
            fontSize={16}
            placeholderTextColor="#64748B"
            borderColor="#E2E8F0"
            borderWidth="1.5"
            padding="3"
            borderRadius="md"
            _focus={{
              borderColor: '#3B82F6',
            }}
          />
          <Input
            variant="outline"
            placeholder="PAN Card"
            value={Pancard}
            onChangeText={text => setPancard(text)}
            width="100%"
            fontSize={16}
            placeholderTextColor="#64748B"
            borderColor="#E2E8F0"
            borderWidth="1.5"
            padding="3"
            borderRadius="md"
            _focus={{
              borderColor: '#3B82F6',
            }}
          />
          <Input
            variant="outline"
            placeholder="Account Number"
            value={AccountNo}
            onChangeText={text => setAccountNo(text)}
            width="100%"
            fontSize={16}
            placeholderTextColor="#64748B"
            borderColor="#E2E8F0"
            borderWidth="1.5"
            padding="3"
            borderRadius="md"
            _focus={{
              borderColor: '#3B82F6',
            }}
          />
          <Input
            variant="outline"
            placeholder="IFSC Code"
            value={Iffs}
            onChangeText={text => setIffs(text)}
            width="100%"
            fontSize={16}
            placeholderTextColor="#64748B"
            borderColor="#E2E8F0"
            borderWidth="1.5"
            padding="3"
            borderRadius="md"
            _focus={{
              borderColor: '#3B82F6',
            }}
          />
          <Button
            backgroundColor={'#E87429'}
            color="#FFFFFF"
            py={3}
            px={8}
            alignSelf="center"
            borderRadius="full"
            marginTop="6"
            _pressed={{backgroundColor: '#1E40AF'}}
            onPress={handleSubmit}>
            <Text fontSize={18} color="#FFFFFF" fontWeight="500">
              Submit
            </Text>
          </Button>
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default BankDetails;
