import { Box, View, Text, Button, Image, Pressable } from "native-base"
import tw from 'twrnc';
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";


WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri();
export const WelcomeScreen = () => {
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
            {/* <Text>{userInfo?.name}</Text> */}
            <Image source={require('../assets/welcome.png')} alt="Welcome" resizeMode="contain" width='50%' height='50%' />
            <Button style={tw`bg-blue-700`} width='90%' onPress={() => navigation.navigate('Login')}>Sign In</Button>
            <Button style={tw`bg-blue-700`} width='90%' onPress={() => navigation.navigate('Signup')}>Sign Up</Button>
            {/* <Pressable backgroundColor="white" style={tw`flex-row items-center justify-center gap-3 border p-2 rounded`} width='90%' onPress={()=>promptAsync()} >
                <Image source={require('../assets/google.png')} alt="Google" width={5} height={5} />
                <Text color="black">Sign in with Google</Text>
            </Pressable> */}
        </Box>
        </Box>
    </Box>
  )
}