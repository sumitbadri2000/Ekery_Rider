import {View} from 'react-native';
import React, {useState} from 'react';
import {Box, Text, Stack, Input, Button, Image, ScrollView} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ridersignup = ({navigation}) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [gst, setGst] = useState('');
  const [referral, setReferral] = useState('');
  const [photo, setPhoto] = useState(null);
  const [aadharfront, setAadharfront] = useState(null);
  const [aadharback, setAadharback] = useState(null);
  const [panfront, setPanfront] = useState(null);
  const [panback, setPanback] = useState(null);
  const [DLfront, setDLfront] = useState(null);
  const [DLback, setDLback] = useState(null);

  const handleChoosePhoto = setter => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        console.log(asset);
        setter(asset);
      }
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', mail);
    formData.append('gst', mail);

    formData.append('photo', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    });
    formData.append('aadharFrontend', {
      uri: aadharfront.uri,
      type: aadharfront.type,
      name: aadharfront.fileName,
    });
    formData.append('aadharBackend', {
      uri: aadharback.uri,
      type: aadharback.type,
      name: aadharback.fileName,
    });
    formData.append('pancardFront', {
      uri: panfront.uri,
      type: panfront.type,
      name: panfront.fileName,
    });
    formData.append('pancardBack', {
      uri: panback.uri,
      type: panback.type,
      name: panback.fileName,
    });
    formData.append('drivingLicenseFront', {
      uri: DLfront.uri,
      type: DLfront.type,
      name: DLfront.fileName,
    });
    formData.append('drivingLicenseBack', {
      uri: DLback.uri,
      type: DLback.type,
      name: DLback.fileName,
    });

    try {
      const response = await axios.post(
        'http://192.168.1.10:5000/api/driver/new',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status == 200) {
        console.log(response.data.data._id);
        console.log(response.data.data.name);
        console.log(response.data.data.email);
        await AsyncStorage.multiSet([
          ['isDriverSignup', 'true'],
          ['userid', response.data.data._id],
          ['name', response.data.data.name],
          ['email', response.data.data.email],
        ]);

        navigation.navigate('RiderBottom');
      }
      // .then(response => {
      //   navigation.navigate('Riderbottomscreen');
      // });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <Box
        width={'100%'}
        height={'100%'}
        backgroundColor={'#FFFFFF'}
        display={'flex'}
        justifyContent={'start'}
        alignItems={'center'}>
        <Box height={'30%'} marginTop={'10'}>
          <Text color={'#000000'} fontSize={'2xl'} textAlign={'center'}>
            Complete your profile
          </Text>
          <Stack space={4} width="80%" maxW="370px" mx="auto">
            <Input
              variant="underlined"
              placeholder="Name"
              width={'90%'}
              marginTop={'8'}
              fontSize={'lg'}
              placeholderTextColor={'black'}
              value={name}
              onChangeText={setName}
            />

            <Input
              variant="underlined"
              placeholder="Email"
              width={'90%'}
              fontSize={'lg'}
              placeholderTextColor={'black'}
              value={mail}
              onChangeText={setMail}
            />

            <Input
              variant="underlined"
              placeholder="Enter Gst (Optional)"
              fontSize={'lg'}
              placeholderTextColor={'black'}
              value={gst}
              onChangeText={setGst}
            />

            <Input
              variant="underlined"
              placeholder="Enter Referral code (Optional)"
              fontSize={'lg'}
              placeholderTextColor={'black'}
              value={referral}
              onChangeText={setReferral}
            />

            <Button
              onPress={() => handleChoosePhoto(setPhoto)}
              backgroundColor={'#E87429'}>
              Choose Photo
            </Button>
            {photo && (
              <Image
                alt="photo"
                source={{uri: photo.uri}}
                style={{width: 100, height: 100}}
              />
            )}

            <Button
              onPress={() => handleChoosePhoto(setAadharfront)}
              backgroundColor={'#E87429'}>
              Choose Aadhaar front Photo
            </Button>
            {aadharfront && (
              <Image
                alt="aadharfront"
                source={{uri: aadharfront.uri}}
                style={{width: 100, height: 100}}
              />
            )}

            <Button
              onPress={() => handleChoosePhoto(setAadharback)}
              backgroundColor={'#E87429'}>
              Choose Aadhar back Photo
            </Button>
            {aadharback && (
              <Image
                alt="aadharback"
                source={{uri: aadharback.uri}}
                style={{width: 100, height: 100}}
              />
            )}

            <Button
              onPress={() => handleChoosePhoto(setPanfront)}
              backgroundColor={'#E87429'}>
              Choose Pan Card Front Photo
            </Button>
            {panfront && (
              <Image
                alt="panfront"
                source={{uri: panfront.uri}}
                style={{width: 100, height: 100}}
              />
            )}

            <Button
              onPress={() => handleChoosePhoto(setPanback)}
              backgroundColor={'#E87429'}>
              Choose Pan Card Back Photo
            </Button>
            {panback && (
              <Image
                alt="panback"
                source={{uri: panback.uri}}
                style={{width: 100, height: 100}}
              />
            )}

            <Button
              onPress={() => handleChoosePhoto(setDLfront)}
              backgroundColor={'#E87429'}>
              Choose Driver License Front photo
            </Button>
            {DLfront && (
              <Image
                alt="DLfront"
                source={{uri: DLfront.uri}}
                style={{width: 100, height: 100}}
              />
            )}

            <Button
              onPress={() => handleChoosePhoto(setDLback)}
              backgroundColor={'#E87429'}>
              Choose Driver License Back photo
            </Button>
            {DLback && (
              <Image
                alt="DLback"
                source={{uri: DLback.uri}}
                style={{width: 100, height: 100}}
              />
            )}

            <Button
              backgroundColor={'#E87429'}
              color={'#FFFFFF'}
              py={2}
              px={6}
              // width={'50%'}
              alignSelf={'center'}
              borderRadius={'full'}
              marginBottom={'1.5'}
              onPress={handleSubmit}>
              <Text fontSize={'xl'} color={'#FFFFFF'} fontWeight={'500'}>
                Submit{' '}
              </Text>
            </Button>
          </Stack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Ridersignup;
