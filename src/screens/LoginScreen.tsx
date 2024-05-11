import {
  FormControl,
  Box,
  Text,
  Input,
  Stack,
  Button,
  Icon,
  Pressable,
  Image,
  View,
  ChevronLeftIcon,
  Modal
} from 'native-base';
import ModalConfirm from 'src/components/Modal';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from 'react-native-heroicons/solid';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useSigninMutation } from 'src/services/users';
import { getUser } from 'src/store/reducers/user';
import { RootState } from 'src/store';
import { storeAsyncStorage } from 'src/helper';

import tw from 'twrnc';
export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAppSelector((state: RootState) => ({ ...state }));
  const [inputError, setInputError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [fetchOne, { data, isLoading, error: loginError }] = useSigninMutation();

  const handleLogin = async () => {
    try {
      await fetchOne({ email: email, password: password });
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  useEffect(() => {
    if (loginError) {
      if (!data) setModalVisible(true);
    } else if (data) {
      if (data.token) {
        storeAsyncStorage('user', {
          token: data.token,
          email: email,
          name: data.name
        });
        dispatch(getUser({ token: data.token, email: email }));
        navigation.navigate('DrawerStack');
      } else setModalVisible(true);
    }
  }, [loginError, data]);

  return (
    <View backgroundColor='white' position={'relative'} height='100%'>
      <Modal
        isOpen={modalVisible}
        padding={5}
        backgroundColor={'gray.500'}
        height={300}
        width={300}
        justifyItems={'center'}
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        transform={[{ translateX: -150 }, { translateY: -150 }]}
      >
        <Icon as={InformationCircleIcon} size={30} color={'white'} />
        <Text fontSize={20} textAlign={'center'} color={'white'}>
          The email or password entered is invalid. Please try again.
        </Text>
        <Button
          marginTop={5}
          width={100}
          backgroundColor={'gray.100'}
          onPress={() => setModalVisible(false)}
        >
          <Text>OK</Text>
        </Button>
      </Modal>
      <Pressable
        flexDirection='row'
        display='flex'
        alignItems='center'
        position='absolute'
        left={5}
        top={20}
        onPress={() => navigation.navigate('Welcome')}
      >
        <ChevronLeftIcon />
        <Text bold marginLeft={2}>
          Back
        </Text>
      </Pressable>
      <Box alignItems='flex-end' marginBottom={10}>
        <Image source={require('../assets/corner.png')} alt='Welcome' resizeMode='contain' />
      </Box>
      <View padding={5}>
        <Text fontSize='3xl' bold style={tw`text-blue-800`}>
          Sign In to EFM!
        </Text>
        <Text style={tw`text-blue-400 mb-5`}>Efficient Finance Managemen(EFM)</Text>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <FormControl>
            <Stack space={4}>
              <Input placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />
              <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                type={showPassword ? 'text' : 'password'}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      as={showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                      size={5}
                      mr='2'
                      color='muted.400'
                    />
                  </Pressable>
                }
                placeholder='Password'
              />
              <Button onPress={handleLogin} style={tw`bg-blue-700`}>
                Login
              </Button>
            </Stack>
            {error && (
              <Text color='red.500' textAlign={'center'} fontWeight={'bold'} marginTop={'5'}>
                {error}
              </Text>
            )}
          </FormControl>
        </Box>
      </View>
    </View>
  );
};
