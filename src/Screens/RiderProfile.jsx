import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  Box,
  Button,
  Image,
  Input,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from 'native-base';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

const RiderProfile = ({navigation}) => {
  const [locname, setLocName] = useState('');
  const [locemail, setLocEmail] = useState('');
  const [locid, setLocId] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userid = await AsyncStorage.getItem('userid');
        const getname = await AsyncStorage.getItem('name');
        const getemail = await AsyncStorage.getItem('email');

        console.log(getname, getemail, userid);

        setLocName(getname);
        setLocEmail(getemail);
        setLocId(userid);
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    checkLogin();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!locid) {
        console.log('ID not found in AsyncStorage');
        return;
      }

      const updatedData = {
        name: locname,
        email: locemail,
      };

      console.log('Updating user data', updatedData);

      const resp = await axios.patch(
        `http://192.168.1.10:5000/api/driver/update/${locid}`,
        updatedData,
      );

      console.log('User details updated successfully:');

      await AsyncStorage.multiSet([
        ['name', updatedData.name],
        ['email', updatedData.email],
      ]);

      Alert.alert('Success', 'User details updated successfully.');

      setEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert('Error', 'Failed to update user details. Please try again.');
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    // Reset local state to reflect current AsyncStorage values
    // checkLogin(); // Assuming checkLogin will reset locname, locemail, locmobile, if needed
    setEditing(false);
  };

  const handleLogout = async () => {
    try {
      const isDriverSignup = await AsyncStorage.getItem('isDriverSignup');
      console.log('isDriverSignup', isDriverSignup);
      if (isDriverSignup === 'true') {
        await AsyncStorage.multiRemove(['isDriverSignup', 'name', 'email']);
        navigation.navigate('Firstscreen');
        console.log('User logged out successfully');
      } else {
        console.log('User is not signed up');
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box style={{gap: 10}} height={'90%'}>
          <Box justifyContent={'center'} alignItems={'center'} height={'40%'}>
            <Image
              resizeMode="contain"
              style={{width: '30%'}}
              source={require('../Assests/userprofile.png')}
              alt="user"
            />
          </Box>

          {editing ? (
            <View
              style={{
                backgroundColor: 'white',
                padding: 14,
                borderRadius: 10,
                elevation: 5,
                marginTop: -20,
                gap: 2,
                width: '90%',
                marginHorizontal: 'auto',
              }}>
              <Input
                style={{
                  borderColor: 'gray',

                  borderRadius: 5,
                }}
                placeholder="Name"
                value={locname}
                onChangeText={text => setLocName(text)}
              />
              <Input
                style={{
                  borderColor: 'gray',

                  borderRadius: 5,
                }}
                placeholder="Email"
                value={locemail}
                onChangeText={text => setLocEmail(text)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 2,
                }}>
                <Button onPress={handleUpdate}>Update</Button>
                <Button onPress={handleCancelEdit} variant="ghost">
                  Cancel
                </Button>
              </View>
            </View>
          ) : (
            <>
              <Box
                py={2}
                width={'80%'}
                marginX={'auto'}
                backgroundColor={'#E86F1C'}
                shadow={'2'}
                borderRadius={'8px'}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'row'}>
                <Text
                  ml={'3'}
                  width={'18%'}
                  fontSize={'sm'}
                  color={'white'}
                  fontWeight={'semibold'}>
                  Name
                </Text>
                <Text fontSize={'sm'} color={'white'} fontWeight={'semibold'}>
                  :
                </Text>
                <Text ml={'3'} fontSize={'sm'} color={'white'}>
                  {locname}
                </Text>
              </Box>

              <Box
                py={2}
                width={'80%'}
                marginX={'auto'}
                backgroundColor={'#E86F1C'}
                shadow={'2'}
                borderRadius={'8px'}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'row'}>
                <Text
                  ml={'3'}
                  width={'18%'}
                  fontSize={'sm'}
                  color={'white'}
                  fontWeight={'semibold'}>
                  Email
                </Text>
                <Text fontSize={'sm'} color={'white'} fontWeight={'semibold'}>
                  :
                </Text>
                <Text ml={'3'} fontSize={'sm'} color={'white'}>
                  {locemail}
                </Text>
              </Box>
            </>
          )}

          {!editing && (
            <Text
              textAlign={'right'}
              width={'95%'}
              mt={-10}
              marginX={'auto'}
              onPress={handleEdit}
              style={{
                color: 'blue',
                textDecorationLine: 'underline',
              }}>
              Edit
            </Text>
          )}
        </Box>

        <Box
          height={'10%'}
          // alignItems={'flex-end'}
          justifyContent={'flex-end'}>
          <Button
            width={'40%'}
            marginX={'auto'}
            backgroundColor={'#333333'}
            onPress={handleLogout}>
            Logout
          </Button>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
    // <></>
  );
};

export default RiderProfile;
