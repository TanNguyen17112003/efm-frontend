import { Box, View, Text, Button, Image, Pressable } from "native-base"
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri();
export const WelcomeScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: "877844441244-ndqdqgbnlmnp6eu65mk20ic03s8uhi40.apps.googleusercontent.com",
      redirectUri
    });
    useEffect(() => {
      handleSignInWithGoogle();
    }, [response]);
    const handleSignInWithGoogle = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (!user) {
        if(response?.type === "success") {
          await getUserInfo(response.authentication?.accessToken);
        }
      } 
      else {
        setUserInfo(JSON.parse(user));
      }
    }
    const getUserInfo = async (token: string | undefined) => {
      if (!token) return;
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: {Authorization: `Bearer ${token}` }
          }
        );
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
      }
      catch (error) {
        console.log(error);
      
      }
    }
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
            <Text>{userInfo?.name}</Text>
            <Image source={require('../assets/welcome.png')} alt="Welcome" resizeMode="contain" width='50%' height='50%' />
            <Button style={tw`bg-blue-700`} width='90%' onPress={() => navigation.navigate('Login')}>Sign In</Button>
            <Button style={tw`bg-blue-700`} width='90%' onPress={() => navigation.navigate('Signup')}>Sign Up</Button>
            <Pressable backgroundColor="white" style={tw`flex-row items-center justify-center gap-3 border p-2 rounded`} width='90%' onPress={()=>promptAsync()} >
                <Image source={require('../assets/google.png')} alt="Google" width={5} height={5} />
                <Text color="black">Sign in with Google</Text>
            </Pressable>
            </Box>
        </Box>
    </Box>
  )
}