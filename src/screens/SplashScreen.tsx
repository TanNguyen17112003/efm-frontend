import { Text, Image, Pressable} from "native-base";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
// import LinearGradient from "react-native-linear-gradient";

export const SplashScreen = () => {
    const navigationRef = useNavigation();
  return (
     <LinearGradient colors={["rgb(207 250 254)", "#ffffff"]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}  >
          <Pressable style={tw`flex-col items-center justify-center gap-5`} height="100%" onPress={() => navigationRef.navigate('Onboarding')}>
            <Image source={require('../assets/welcome.png')} alt="Welcome" />
            <Text bold fontSize="4xl" color="red" style={tw`text-center text-[#1200A4]`}>Efficient Finance Managements</Text>
          </Pressable>
      </LinearGradient>
  )
}
