
import { Box, Text, FlatList, View, Switch, ChevronRightIcon } from "native-base"
import tw from 'twrnc';
export const MenuScreen = () => {
    const userData = {
        name: 'Minh Lộc',
        email: 'minhloc@gmail.com'
    }
    const items = [
        {
            name: 'Friends',
            icon: <ChevronRightIcon />
        },
        {
            name: 'Notification',
            icon: <Switch />
        },
        {
            name: 'About',
            icon: <ChevronRightIcon />
        },
        {
            name: 'Help',
            icon: <ChevronRightIcon />
        },
        {
            name: 'Logout',
            icon: <ChevronRightIcon />
        }
    ]
  return (
    <Box>
        <Box backgroundColor="blue.700" style={tw`p-5`}>
        <Text bold fontSize='2xl' color="white" style={tw`mb-4`}>Menu</Text>
        <View style={tw`flex justify-center`}>
            <View style={tw`flex-row items-center gap-3`}>
                <Text style={tw`py-2 px-3.5 rounded-full bg-white text-center`} bold>{userData.name.charAt(0).toUpperCase()}</Text>
                <Box>
                    <Text bold color='white'>{userData.name}</Text>
                    <Text color='white'>{userData.email}</Text>
                </Box>
            </View>
        </View>
    </Box>
    <FlatList   
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
            <Box style={tw`flex-row justify-between items-center px-5 py-3 border-b border-gray-200`}>
                <Text>{item.name}</Text>
                {item.icon}
            </Box>
        )}
    />
    </Box>
  )
}

