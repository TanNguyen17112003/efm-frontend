import tw from 'twrnc';
import { Box, Text, Icon, View, Heading, ChevronLeftIcon, FormControl, Select, Input, Button, HStack, Progress, FlatList } from "native-base"
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createChallenge } from '@services';
import { getJWT } from '@utils';

type Param = {
  challengeId: number
}

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

const usersDummy: User[] = [
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
]

const challengeListDummy: Challenge[] = [
  {
      id: 1,
      name: 'Saved Money for Dinner LandMark',
      description: 'Week in SaiGon',
      current: 2000000,
      target: 5200000,
      date: new Date(2024, 2, 23),
      category: 'Food',
      attendants: [1],
      createdBy: 1,
  },
  {
      id: 2,
      name: 'Saved Money for Vung Tau',
      description: 'Week in Vung Tau',
      current: 2000000,
      target: 2200000,
      date: new Date(2024, 2, 23),
      category: 'Holiday',
      attendants: [1, 2],
      createdBy: 1,
  },
  {
      id: 3,
      name: 'Saved Money',
      description: 'Saved Money to win',
      current: 1800000,
      target: 4000000,
      date: new Date(2024, 2, 23),
      category: 'Salary',
      attendants: [2, 3, 1],
      createdBy: 2,
  },
  {
      id: 4,
      name: 'Saved Money for Dinner LandMark',
      description: 'Week in SaiGon',
      current: 2000000,
      target: 5200000,
      date: new Date(2024, 2, 23),
      category: 'Food',
      attendants: [1],
      createdBy: 1,
  },
  {
      id: 5,
      name: 'Saved Money for Vung Tau',
      description: 'Week in Vung Tau',
      current: 2000000,
      target: 2200000,
      date: new Date(2024, 2, 23),
      category: 'Holiday',
      attendants: [1, 2, 3],
      createdBy: 1,
  },
  {
      id: 6,
      name: 'Saved Money',
      description: 'Saved Money to win',
      current: 1800000,
      target: 4000000,
      date: new Date(2024, 2, 23),
      category: 'Salary',
      attendants: [1, 2, 3],
      createdBy: 3,
  },
]


export const DetailChallengeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { challengeId } = route.params as Param;
  const [token, setToken] = useState<string>('');
  const [currentChallenge, setCurrentChallenge] = useState(challengeListDummy[challengeId - 1])
  const [description, setDescription] = useState<string>(currentChallenge.description);

  const [show, setShow] = useState<boolean>(false);

  const currentAttendants: User[] = usersDummy.filter(user => currentChallenge.attendants.includes(user.id))

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
        <ChevronLeftIcon style={tw`text-white absolute left-5 top-11`} onPress={() => navigation.navigate("Challenge")}/> 
        <Heading color="white" fontSize={20}>{currentChallenge.name}</Heading>
        <Text color={'white'} mb={'5'}>{currentChallenge.attendants.length} Participants</Text>
      </Box>

      <Box mx={'auto'} mt={10}>
        <Progress w='365' h={4} shadow={2} value={currentChallenge.current / currentChallenge.target * 100} style={tw`mb-3`}/>
        <View style={tw`flex-row items-center gap-2 mb-3`}>
          <Text bold>{`${currentChallenge.current / 1000000}M VNĐ`}</Text>
          <Text>{`saved of ${currentChallenge.target / 1000000}M VNĐ`}</Text>
        </View>
      </Box>

      <FormControl padding={5}>
        <FormControl.Label><Text fontSize={"2xl"} bold color="black">Description</Text></FormControl.Label>
        <Input
          isReadOnly={true}
          value={description}
          bg={'white'}
          // onChangeText={(value) => setDescription(value)}
        />   
      </FormControl>

      <Box
        display={'flex'}
        flexDir={'row'}
        mx={'5'}
        justifyContent={'space-between'}
      >
        <Button w={'40%'} backgroundColor="blue.400">Contribute</Button>
        <Button w={'40%'} backgroundColor="blue.600">Withdraw</Button>    
      </Box>

      <Box
        display={'flex'}
        flexDir={'row'}
        justifyContent={'center'}
        mt={5}
      >
        <Button w={'20%'} backgroundColor="blue.400" onPress={() => navigation.navigate("Share")}>Share</Button>    
      </Box>      

      <FlatList
          style={tw`p-3`}
          data={currentAttendants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
          <Box style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
            <View style={tw`flex-row items-center gap-3`}>
                <Image src={item.image} alt="avatar" style={tw`w-10 h-10`} />
                <View w={'60%'}>
                    <Text bold>{item.name}</Text>
                    <Text opacity={50}>Đóng ngày 10</Text>
                </View>
                <Text bold>+500.000 VND</Text>
            </View>
          </Box>
          )}
      />

    </Box>
  )
}
