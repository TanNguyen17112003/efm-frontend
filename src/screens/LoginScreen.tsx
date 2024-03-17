import { FormControl, Box, Text, Input, Stack, Button, Icon, Pressable } from "native-base"
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import tw from 'twrnc';
export const LoginScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Box style={tw`px-10 py-50`}>
        <Text fontSize='3xl' bold style={tw`text-blue-800`}>Welcome!</Text>
        <Text style={tw`text-blue-400 mb-5`}>
            Efficient Finance Managemen(EFM)
        </Text>
        <FormControl>
            <Stack space={4}>   
                <Input placeholder="Username"/>
                <Input type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon as={showPassword ? <EyeIcon /> : <EyeSlashIcon />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password"/>
                <Button onPress={() => navigation.navigate('DrawerStack')} style={tw`bg-blue-700`}>Login</Button>
            </Stack>
        </FormControl>
    </Box>
  )
}
