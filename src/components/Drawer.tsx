import { Box, Text, Icon, View } from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import {Plus} from "./Plus";
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
  <Box style={tw`absolute -top-5 left-0 right-0 items-center justify-center`}>
    <Plus address="AddActivity"/>
  </Box>
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
