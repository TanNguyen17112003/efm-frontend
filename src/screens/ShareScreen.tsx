import tw from 'twrnc';
import { Box, Text, Icon, View, Heading, ChevronLeftIcon, FormControl, Select, Input, Button, HStack, Progress, FlatList, Pressable } from "native-base"
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CalendarDaysIcon, LinkIcon, MagnifyingGlassIcon, ShareIcon } from 'react-native-heroicons/solid';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createChallenge } from '@services';
import { getJWT } from '@utils';

type User = {
  id: number,
  name: string,
  image: string,
}

const me: User = {
  id: 1,
  name: 'Đức Huy',
  image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
}

const friendsListDummy: User[] = [
  {
    id: 1,
    name: 'Đức Huy',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
  },
  {
    id: 2,
    name: 'Minh Lộc',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
  },
  {
    id: 3,
    name: 'Duy Tân',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
  },
  {
    id: 4,
    name: 'Nguyễn Hùng',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
  },
  {
    id: 5,
    name: 'Tuấn Khanh',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
  },
  {
    id: 6,
    name: 'Vân Anh',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
  },
]


export const ShareScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState<string>('');

  // useEffect(() => {
  //   const getToken = async () => {
  //     const data = await getJWT();
  //     if (data) {
  //       setToken(data.token);
  //     }
  //   }
  //   getToken();
  // },[])

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    icon: {
      width: 60,
      height: 60,
      margin: 10,
    },
    selectedIcon: {
      borderWidth: 4,
      borderColor: 'blue',
      borderRadius: 100,
    },
    selectedText: {
      fontWeight: 'bold',
      color: 'blue',
    },
    tick: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      fontSize: 24,
      color: 'blue',
    },
  });

  return (
    <Box backgroundColor={"gray.100"} h={'100%'}>
      <Box backgroundColor="blue.700" px={5} pt={10} position="relative" borderBottomRadius={0} display='flex' justifyContent='center' alignItems='center'>
        <ChevronLeftIcon style={tw`text-white absolute left-5 top-13`} onPress={() => navigation.goBack()}/> 
        <Heading color="white" fontSize={20}>Share</Heading>
        <Text color={'white'} mb={'5'}>Choose your friend to share</Text>
      </Box>

      <Input 
        placeholder="Search"  
        w={{
            base: "85%",
            md: "25%",
        }} 
        mx={'auto'}
        my={5}
        InputRightElement={
          <Pressable>
            <Icon as={<MagnifyingGlassIcon />} size={5} mr="2" color="muted.400" />
          </Pressable>
        }
        type="text" 
        backgroundColor='white'
      />

      <FlatList
        style={tw`p-3`}
        mx={5}
        data={friendsListDummy}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
        <Box style={tw`p-5 mb-2`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
          <View style={tw`flex-row items-center gap-3`}>
              <Image src={item.image} alt="avatar" style={tw`w-10 h-10`} />
              <View w={'70%'}>
                  <Text bold>{item.name}</Text>
                  <Text opacity={50}>5 mutual challenges</Text>
              </View>
              <Pressable>
                <Icon as={<ShareIcon />} size={5} mr="2" color="muted.400" />
              </Pressable>
          </View>
        </Box>
        )}
      />

      <FormControl padding={5} mb={5} mx={3}>
        <FormControl.Label><Text fontSize={"2xl"} bold color="black">Or share your link</Text></FormControl.Label>
        <Input
          isReadOnly={true}
          bg={'white'}
          w={'94%'}
          value={'url'}
          InputRightElement={
            <Pressable>
              <Icon as={<LinkIcon />} size={5} mr="2" color="muted.400" />
            </Pressable>
          }
        />   
      </FormControl>

    </Box>
  )
}
