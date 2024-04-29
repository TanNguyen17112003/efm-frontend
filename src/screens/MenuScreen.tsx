import {
  Box,
  Text,
  FlatList,
  View,
  Switch,
  ChevronRightIcon,
  AlertDialog,
  Button,
  Icon
} from 'native-base';
import { CheckIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { getJWT, clearJWT } from '@utils';
import { RootState } from 'src/store';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useDispatch } from 'react-redux';
import { logout } from 'src/store/reducers/user';
import { resetActivities } from 'src/store/reducers/activities';
import { resetChallenges } from 'src/store/reducers/challenges';
import { resetGoals } from 'src/store/reducers/goals';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const MenuScreen = () => {
  const cancelRef = useRef(null);
  const [isShowLogoutDialog, setIsShowLogoutDialog] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation();
  const { user } = useAppSelector((state: RootState) => ({ ...state }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  const items = [
    {
      name: 'Friends',
      icon: <ChevronRightIcon />
    },
    {
      name: 'Notification',
      icon: <Switch />
    },
    {
      name: 'About',
      icon: <ChevronRightIcon />
    },
    {
      name: 'Change Passwords',
      icon: <ChevronRightIcon />
    },
    {
      name: 'Help',
      icon: <ChevronRightIcon />
    },
    {
      name: 'Logout',
      icon: <ChevronRightIcon />
    }
  ];
  const handlePress = (name: string) => () => {
    if (name === 'Friends') {
      navigation.navigate('Friend');
    }
    if (name === 'About') {
      navigation.navigate('About');
    }
    if (name === 'Change Passwords') {
      navigation.navigate('ChangePassword');
    }
    if (name === 'Logout') {
      setIsShowLogoutDialog(true);
    }
  };
  const onClose = () => {
    setIsShowLogoutDialog(false);
  };

  const handleLogout = async () => {

    dispatch(resetActivities());
    dispatch(resetChallenges());
    dispatch(resetGoals());
    dispatch(logout());
    await AsyncStorage.clear();
    setIsShowLogoutDialog(false);
    navigation.navigate('Login');
  };
  return (
    <Box>
      <Box backgroundColor='blue.700' style={tw`p-5`}>
        <Text bold fontSize='2xl' color='white' style={tw`mb-4`}>
          Menu
        </Text>
        <View style={tw`flex justify-center`}>
          <View style={tw`flex-row items-center gap-3`}>
            <Text style={tw`py-2 px-3.5 rounded-full bg-white text-center`} bold>
              {name.charAt(0).toUpperCase()}
            </Text>
            <Box>
              <Text bold color='white'>
                {name}
              </Text>
              <Text color='white'>{email}</Text>
            </Box>
          </View>
        </View>
      </Box>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={handlePress(item.name)}
            style={tw`flex-row justify-between items-center px-5 py-3 border-b border-gray-200`}
          >
            <Text>{item.name}</Text>
            {item.icon}
          </TouchableOpacity>
        )}
      />
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isShowLogoutDialog} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Body padding={-2}>
            <Box
              backgroundColor={'green.300'}
              height={100}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 36,
                  borderWidth: 2,
                  borderColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon as={<CheckIcon />} size={36} color='white' />
              </View>
            </Box>
            <Box marginTop={5}>
              <Text textAlign={'center'} bold>
                Are you sure?
              </Text>
              <Text textAlign={'center'}>Do you want to logout</Text>
              <Button.Group space={2} display={'flex'} justifyContent={'center'} marginY={5}>
                <Button variant='unstyled' colorScheme='coolGray' onPress={onClose} ref={cancelRef}>
                  No
                </Button>
                <Button colorScheme='success' onPress={handleLogout}>
                  Yes
                </Button>
              </Button.Group>
            </Box>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};
