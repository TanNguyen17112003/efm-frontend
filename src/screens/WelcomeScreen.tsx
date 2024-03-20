import { Box, View, Text, Button, Image, Pressable } from "native-base"
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const WelcomeScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, prompAsync] = Google.useAuthRequest({
      androidClientId: "877844441244-ndqdqgbnlmnp6eu65mk20ic03s8uhi40.apps.googleusercontent.com"
    });
    const handleGoogleSignIn = async () => {
      try {
        const result = await prompAsync();
        if (result.type === 'success') {
          // The user is authenticated. You can now use result.params to do things like get the user's name and email.
          console.log("Nice")
        } else {
          // The user did not authenticate successfully. You can handle this however you like in your UI.
          console.log('User cancelled');
        }
      } catch (error) {
        console.error(error);
      }
    };
    const navigation = useNavigation();
  return (
    <Box backgroundColor="white" height='100%'>
        <Box alignItems='flex-end'>
        <Image source={require('../assets/corner.png')} alt="Welcome" resizeMode="contain"/>
        </Box>
        <Box paddingX={5} paddingY={2}>
        <Text fontSize='3xl' bold style={tw`text-blue-800`}>Welcome!</Text>
            <Text style={tw`text-blue-400 mb-5`}>
                Efficient Finance Managemen(EFM)
            </Text>
        <Box style={tw`flex-col items-center gap-3`}>
            <Image source={require('../assets/welcome.png')} alt="Welcome" resizeMode="contain" width='50%' height='50%' />
            <Button style={tw`bg-blue-700`} width='90%' onPress={() => navigation.navigate('Login')}>Sign In</Button>
            <Button style={tw`bg-blue-700`} width='90%' onPress={() => navigation.navigate('Signup')}>Sign Up</Button>
            <Pressable backgroundColor="white" style={tw`flex-row items-center justify-center gap-3 border p-2 rounded`} width='90%' onPress={handleGoogleSignIn}>
                <Image source={require('../assets/google.png')} alt="Google" width={5} height={5} />
                <Text color="black">Sign in with Google</Text>
            </Pressable>
            {/* <Button onPress={prompAsync}>Sign In with Google</Button> */}
        </Box>
        </Box>
    </Box>
  )
}
