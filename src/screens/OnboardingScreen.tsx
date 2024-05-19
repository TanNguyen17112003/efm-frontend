
import { useNavigation } from "@react-navigation/native"
import { Image } from "react-native"
import { OnboardFlow } from "react-native-onboard"
export const OnboardingScreen = () => {
    const navigation = useNavigation()
    const onBoardingList = [
        {   
            title: 'No More Financial Stress With Our App',
            subtitle: 'EFM is delighted to help you take control of your money',
            imageUri: Image.resolveAssetSource(require('../assets/onboarding-1.png')).uri
        },
        {
            title: 'Track Your Money And Achieve Goals Easily',
            subtitle: 'EFM helps you in reviewing finance in details with lots of chart type and is also a good idea for you to set goals in the future',
            imageUri: Image.resolveAssetSource(require('../assets/onboarding-2.png')).uri
        },
        {
            title: 'Make Friends And Challenge',
            subtitle: 'EFM also helps you make friends, get pairs and challenge in financial routines',
            imageUri: Image.resolveAssetSource(require('../assets/onboarding-3.png')).uri
        }
    ]
  return (
   <OnboardFlow 
        pages={onBoardingList}
        onDone={() => navigation.navigate('Welcome')}
   />
    
  )
}
