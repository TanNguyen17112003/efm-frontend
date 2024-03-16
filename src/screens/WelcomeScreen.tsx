import { Text, Image, View, Button } from "native-base";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


export const WelcomeScreen = () => {
    const navigationRef = useNavigation();
  return (
    <View style={tw`flex-1 items-center justify-center gap-5`}>
        <Image source={require('../assets/welcome.png')} alt="Welcome" />
        <Text bold fontSize="4xl" color="red" style={tw`text-center text-[#1200A4]`}>Efficient Finance Managements</Text>
        <Button backgroundColor="#1200A4" style={tw`font-bold`} onPress={() => navigationRef.navigate('Onboarding')}>Get Startted</Button>
    </View>
  )
}
