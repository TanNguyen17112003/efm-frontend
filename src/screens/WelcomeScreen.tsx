import { Text, Image, Pressable} from "native-base";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


export const WelcomeScreen = () => {
    const navigationRef = useNavigation();
  return (
      <Pressable style={tw`flex-1 items-center justify-center gap-5`}  onPress={() => navigationRef.navigate("Onboarding")}>
        <Image source={require('../assets/welcome.png')} alt="Welcome" />
        <Text bold fontSize="4xl" color="red" style={tw`text-center text-[#1200A4]`}>Efficient Finance Managements</Text>
      </Pressable>
  )
}
