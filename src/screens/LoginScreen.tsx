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
  ChevronLeftIcon
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { login } from '@services';
import { storeJWT } from '@utils';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useSigninMutation } from 'src/services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from 'src/store/reducers/user';
import { RootState } from 'src/store';
import { storeAsyncStorage } from 'src/helper';

import tw from 'twrnc';
export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
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
      //await storeJWT(data);
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  useEffect(() => {
    if (loginError) {
    } else if (data) {
      if (data.token) {
        storeAsyncStorage('user', {
          token: data.token,
          email: email,
          name: data.name
        });
        dispatch(getUser({ token: data.token, email: email }));
        navigation.navigate('DrawerStack')
      }
    }
  }, [loginError, data]);

  return (
    <View backgroundColor='white' position='relative' height='100%'>
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
