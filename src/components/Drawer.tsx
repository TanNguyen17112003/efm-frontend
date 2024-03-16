import { Box, Text, Icon, View } from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { PlusCircleIcon } from "react-native-heroicons/solid";
import tw from 'twrnc';

export const Drawer = () => {
  const navigation = useNavigation();
  const drawerList = [
    {
      title: 'Home',
      name: 'home',
      onPress: () => navigation.navigate('Home')
    },
    {
      title: 'Goals',
      name: 'bullseye-arrow',
      onPress: () => navigation.navigate('Goal')
    },
    {
      title: 'Challenge',
      name: 'trophy',
      onPress: () => navigation.navigate('Challenge')
    },
    {
      title: 'Menu',
      name: 'menu',
      onPress: () => navigation.navigate('Menu')
    }
  ]
  return (
    <Box backgroundColor="white" style={tw`relative`}>
      <Icon as={<PlusCircleIcon size={50} />} color="blue.500" style={tw`absolute left-43 -top-5`}/>
      <View style={tw`flex-row items-center justify-around py-5`}>
      {drawerList.map((item, index) => (
        <Box style={tw`flex-col items-center`}>
          <Icon key={index} as={MaterialCommunityIcons} name={item.name} size={8} onPress={item.onPress} />
          <Text>{item.title}</Text>
        </Box>
      ))}
    </View>
    </Box>
    
  )
}
