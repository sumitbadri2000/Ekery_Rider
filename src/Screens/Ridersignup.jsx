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
import Icon1 from 'react-native-vector-icons/MaterialIcons';

import Icons from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';

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
  const [isDocument, setIsDocument] = useState(false);
  const [isDriverinfo, setIsDriverinfo] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [RC , setRC] = useState(null)

  const handleChoosePhoto = setter => {
    Alert.alert(
      'Select Option',
      'Choose an option to upload photo',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({}, response => {
              if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                setter(asset);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({}, response => {
              if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                setter(asset);
              }
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleChooseCamera = setter => {
    launchCamera({}, response => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setter(asset);
      }
    });
  }

  const handleNext = () => {
    setIsDriverinfo(false);
    setIsDocument(true);
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !mail ||
      !photo ||
      !aadharfront ||
      !aadharback ||
      !panfront ||
      !panback ||
      !DLfront ||
      !DLback ||
      !RC
    ) {
      Alert.alert(
        'Incomplete Information',
        'Please upload all required documents before submitting.'
      );
      return;
    }

    setIsLoader(true)
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
    formData.append('RC', {
      uri: RC.uri,
      type: RC.type,
      name: RC.fileName,
    });

    try {
    const response = await axios.post(
      'https://app-api.ekery.in/api/driver/new',
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
        ['driverid', response.data.data._id],
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
    <ScrollView backgroundColor={'#FFFFFF'}>
      <Box
        width={'100%'}
        height={'100%'}
        display={'flex'}
        justifyContent={'start'}
        alignItems={'center'}>
        <Box height={'30%'} marginTop={'10'} width={'100%'}>
          {isDriverinfo && (
            <Stack space={4} width="90%" maxW="370px" mx="auto">
              <Text color={'#000000'} fontSize={'2xl'} textAlign={'center'}>
                Complete your profile
              </Text>
              <Input
                variant="underlined"
                placeholder="Name"
                width={'100%'}
                marginTop={'8'}
                fontSize={'lg'}
                placeholderTextColor={'black'}
                value={name}
                onChangeText={setName}
              />

              <Input
                variant="underlined"
                placeholder="Email"
                width={'100%'}
                fontSize={'lg'}
                placeholderTextColor={'black'}
                value={mail}
                onChangeText={setMail}
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
                backgroundColor={'#E87429'}
                color={'#FFFFFF'}
                py={2}
                px={6}
                alignSelf={'center'}
                borderRadius={'full'}
                marginBottom={'1.5'}
                onPress={handleNext}>
                <Text fontSize={'xl'} color={'#FFFFFF'} fontWeight={'500'}>
                  Submit{' '}
                </Text>
              </Button>
            </Stack>
          )}

          {isDocument && (
            <Stack space={4} width="90%" maxW="370px" mx="auto">
              <Text color={'#000000'} fontSize={'xl'} textAlign={'center'}>
                Submit your document to complete your profile
              </Text>
              {/* Example of Your PAN Card Photo selection */}
              <TouchableOpacity
                onPress={() => handleChooseCamera(setPhoto)}
                style={{marginTop: 10}}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Your Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {/* Display PAN Card Photo if selected */}
              {photo && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="cx"
                    source={{uri: photo.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

              {/* Example of Aadhaar Front Photo selection */}
              <TouchableOpacity
                onPress={() => handleChoosePhoto(setAadharfront)}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    width={'64'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Choose Aadhaar Front Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {/* Display Aadhaar Front Photo if selected */}
              {aadharfront && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="cc"
                    source={{uri: aadharfront.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

              {/* Repeat the above structure for Aadhaar Back Photo */}
              <TouchableOpacity
                onPress={() => handleChoosePhoto(setAadharback)}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    width={'64'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Choose Aadhaar Back Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {/* Display Aadhaar Back Photo if selected */}
              {aadharback && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="cz"
                    source={{uri: aadharback.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

              {/* Repeat the structure for PAN Card Front Photo */}
              <TouchableOpacity onPress={() => handleChoosePhoto(setPanfront)}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    width={'64'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Choose PAN Card Front Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {/* Display PAN Card Front Photo if selected */}
              {panfront && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="cs"
                    source={{uri: panfront.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

              {/* Repeat the structure for PAN Card Back Photo */}
              <TouchableOpacity onPress={() => handleChoosePhoto(setPanback)}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    width={'64'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Choose PAN Card Back Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {/* Display PAN Card Back Photo if selected */}
              {panback && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="sf"
                    source={{uri: panback.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

              {/* Repeat the structure for DL Front Photo */}
              <TouchableOpacity onPress={() => handleChoosePhoto(setDLfront)}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    width={'64'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Choose DL Front Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {/* Display DL Front Photo if selected */}
              {DLfront && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="dss"
                    source={{uri: DLfront.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

              {/* Repeat the structure for DL Back Photo */}
              <TouchableOpacity onPress={() => handleChoosePhoto(setDLback)}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    width={'64'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Choose DL Back Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {/* Display DL Back Photo if selected */}
              {DLback && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="dss"
                    source={{uri: DLback.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

<TouchableOpacity onPress={() => handleChoosePhoto(setRC)}>
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Flex
                    width={'64'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}>
                    <Icon name="filetext1" size={22} />
                    <Box marginLeft={'4'}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Choose RC Photo
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Must be clearly visible
                      </Text>
                    </Box>
                  </Flex>
                  <Icon1 name="arrow-forward-ios" size={25} />
                </Box>
                <Divider
                  borderColor={'muted.500'}
                  width={'container'}
                  color={'#000000'}
                  marginTop={'2'}
                />
              </TouchableOpacity>

              {RC && (
                <Box alignItems="center" marginTop={4}>
                  <Image
                    alt="dss"
                    source={{uri: RC.uri}}
                    style={{width: 100, height: 100}}
                    resizeMode="cover"
                  />
                </Box>
              )}

              {/* Submit Button */}
              <Button
                backgroundColor={'#E87429'}
                color={'#FFFFFF'}
                py={2}
                px={100}
                alignSelf={'center'}
                borderRadius={'full'}
                onPress={handleSubmit}
                marginBottom={'12'}>
                {isLoader ? (
                  <Spinner color={'#FFFFFF'} />
                ) : (
                  <Text fontSize={'xl'} color={'#FFFFFF'} fontWeight={'500'}>
                    Submit{' '}
                  </Text>
                )}
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Ridersignup;
