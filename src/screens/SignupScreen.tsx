import { FormControl, Box, Text, Input, Stack, Button, Icon, Pressable, Image, View, ChevronLeftIcon, AlertDialog } from "native-base"
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { checkValidEmail, checkPairPassword } from "@utils";
import { register } from "@services";

import tw from 'twrnc';
import { Alert } from "react-native";
export const SignupScreen = () => {
    const cancelRef = useRef(null);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
      checkValidEmail(email)
    },[email])

    useEffect(() => {
      checkPairPassword(password, confirmPassword)
    }, [password, confirmPassword])
    
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSignUp = async () => {
      try {
        const response = await register(email, password, userName);
        if (response.userInfo) {
          navigation.navigate('Login');
          console.log(response.userInfo)
        }
        else {
          setErrorMessage(response.message);
          setShowErrorDialog(true);
        }
      }
      catch (e) {
        throw e
      }
    }
  return (
    <View backgroundColor="white" position='relative' height='100%'>
       <Pressable flexDirection="row" display="flex" alignItems='center' position='absolute' left={5} top={10} onPress={() => navigation.navigate('Welcome')}>
       <ChevronLeftIcon/>
       <Text bold marginLeft={2}>Back</Text>
       </Pressable>
        <Box alignItems='flex-end' marginBottom={10}>
        <Image source={require('../assets/corner.png')} alt="Welcome" resizeMode="contain"/>
        </Box>
        <View padding={5}>
        <Text fontSize='3xl' bold style={tw`text-blue-800`}>Sign Up to EFM!</Text>
        <Text style={tw`text-blue-400 mb-5`}>
            Efficient Finance Managemen(EFM)
        </Text>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <FormControl>
            <Stack space={4}>
                <Input 
                  placeholder="Username" 
                  onChangeText={userName => setUserName(userName)}
                />
                <Input 
                  placeholder="Email" 
                  onChangeText={email => setEmail(email)}
                />
                {email && !checkValidEmail(email) && <Text color='red.500' textAlign={"center"} fontWeight={"bold"}>Invalid Email!</Text>}
                <Input 
                  type={showPassword ? "text" : "password"} 
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon as={showPassword ? <EyeIcon /> : <EyeSlashIcon />} size={5} mr="2" color="muted.400" />
                    </Pressable>} 
                  placeholder="Password"
                  onChangeText={password => setPassword(password)}
                />
          <Input type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon as={showPassword ? <EyeIcon /> : <EyeSlashIcon />} size={5} mr="2" color="muted.400" />    
          </Pressable>} placeholder="Confirm Password" onChangeText={(e) => setConfirmPassword(e)}/>
          {!checkPairPassword(password, confirmPassword) && <Text color='red.500' textAlign={"center"} fontWeight={"bold"}>Password does not match</Text>}
                <Button onPress={handleSignUp} style={tw`bg-blue-700`}>Sign Up</Button>
            </Stack>
        </FormControl>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={showErrorDialog} onClose={() => setShowErrorDialog(false)}>
          <AlertDialog.Content>
            <AlertDialog.Body>{errorMessage}</AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>
        </Box>
        </View>
    </View>
  )
}
