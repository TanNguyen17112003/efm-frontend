
import { Box, Text, FlatList, View, Switch, ChevronRightIcon, AlertDialog, Button, Icon } from "native-base";
import { CheckIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
import { TouchableOpacity } from "react-native";
import { getInformation } from "@services";
import { useEffect, useState, useRef } from "react";
import { getJWT, clearJWT } from "@utils";
export const MenuScreen = () => {
    const cancelRef = useRef(null);
    const [isShowLogoutDialog, setIsShowLogoutDialog] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const navigation = useNavigation();
    useEffect(() => {
        const getData = async () => {
            const tokenInformation = await getJWT();
            if (tokenInformation) {
                const data = await getInformation(tokenInformation.token);
                if(data){
                    setName(data.name);
                    setEmail(data.email);
                }
            }
        }
        getData();
    },[])
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
    const handlePress = (name: string) => () => {
        if(name === 'Friends'){
            navigation.navigate('Friend')
        }
        if (name === 'Logout') {
            setIsShowLogoutDialog(true)
        }
    }
    const onClose = () => {
        setIsShowLogoutDialog(false)
    }
    const handleLogout = async () => {
        await clearJWT();
        navigation.navigate('Login');
    }
  return (
    <Box>
        <Box backgroundColor="blue.700" style={tw`p-5`}>
        <Text bold fontSize='2xl' color="white" style={tw`mb-4`}>Menu</Text>
        <View style={tw`flex justify-center`}>
            <View style={tw`flex-row items-center gap-3`}>
                <Text style={tw`py-2 px-3.5 rounded-full bg-white text-center`} bold>{name.charAt(0).toUpperCase()}</Text>
                <Box>
                    <Text bold color='white'>{name}</Text>
                    <Text color='white'>{email}</Text>
                </Box>
            </View>
        </View>
    </Box>
    <FlatList   
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
            <TouchableOpacity onPress={handlePress(item.name)} style={tw`flex-row justify-between items-center px-5 py-3 border-b border-gray-200`}>
                <Text>{item.name}</Text>
                {item.icon}
            </TouchableOpacity>
        )}
    />
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isShowLogoutDialog} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Body padding={-2}>
            <Box backgroundColor={'green.300'}  height={100} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <View
    style={{
      padding: 10,
      borderRadius: 36,
      borderWidth: 2,
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon as={<CheckIcon />} size={36} color="white" />
  </View>
            </Box>
            <Box marginTop={5}>
                <Text textAlign={'center'} bold>Are you sure?</Text>
                <Text textAlign={'center'}>Do you want to logout</Text>
                <Button.Group space={2} display={'flex'} justifyContent={'center'} marginY={5}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                No
              </Button>
              <Button colorScheme="success" onPress={handleLogout}>
                Yes
              </Button>
            </Button.Group>
            </Box>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  )
}

