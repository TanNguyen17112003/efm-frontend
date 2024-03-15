import { FormControl, Box, Text, Input, Stack, Button } from "native-base"
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
export const LoginScreen = () => {
    const navigation = useNavigation();
  return (
    <Box style={tw`px-10 py-50`}>
        <Text fontSize='3xl' bold style={tw`text-blue-800`}>Welcome!</Text>
        <Text style={tw`text-blue-400 mb-5`}>
            Efficient Finance Managemen(EFM)
        </Text>
        <FormControl>
            <Stack space={4}>   
                <Input placeholder="Username"/>
                <Input type="password" placeholder="Password"/>
                <Button onPress={() => navigation.navigate('Welcome')} style={tw`bg-blue-700`}>Login</Button>
            </Stack>
        </FormControl>
    </Box>
  )
}
