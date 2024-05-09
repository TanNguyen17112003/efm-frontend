import tw from 'twrnc';
import {
  Box,
  Text,
  View,
  Heading,
  ChevronLeftIcon,
  FormControl,
  Input,
  Button,
  Progress,
  FlatList
} from 'native-base';
import { Alert, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createChallenge } from '@services';
import { getJWT } from '@utils';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { RootState } from 'src/store';
import {
  contributeToChallenge,
  getChallengeById,
  getContribution,
  getChallenges
} from 'src/store/reducers/challenges';

type Param = {
  id: string;
};

type User = {
  id: number;
  name: string;
  image: string;
};

// const me: User = {
//   id: 1,
//   name: 'Đức Huy',
//   image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
// };

// const usersDummy: User[] = [
//   {
//     id: 1,
//     name: 'Đức Huy',
//     image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
//   },
//   {
//     id: 2,
//     name: 'Minh Lộc',
//     image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
//   },
//   {
//     id: 3,
//     name: 'Duy Tân',
//     image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
//   }
// ];

// const challengeListDummy: Challenge[] = [
//   {
//     id: 1,
//     name: 'Saved Money for Dinner LandMark',
//     description: 'Week in SaiGon',
//     current: 2000000,
//     target: 5200000,
//     date: new Date(2024, 2, 23),
//     category: 'Food',
//     attendants: [1],
//     createdBy: 1
//   },
//   {
//     id: 2,
//     name: 'Saved Money for Vung Tau',
//     description: 'Week in Vung Tau',
//     current: 2000000,
//     target: 2200000,
//     date: new Date(2024, 2, 23),
//     category: 'Holiday',
//     attendants: [1, 2],
//     createdBy: 1
//   },
//   {
//     id: 3,
//     name: 'Saved Money',
//     description: 'Saved Money to win',
//     current: 1800000,
//     target: 4000000,
//     date: new Date(2024, 2, 23),
//     category: 'Salary',
//     attendants: [2, 3, 1],
//     createdBy: 2
//   },
//   {
//     id: 4,
//     name: 'Saved Money for Dinner LandMark',
//     description: 'Week in SaiGon',
//     current: 2000000,
//     target: 5200000,
//     date: new Date(2024, 2, 23),
//     category: 'Food',
//     attendants: [1],
//     createdBy: 1
//   },
//   {
//     id: 5,
//     name: 'Saved Money for Vung Tau',
//     description: 'Week in Vung Tau',
//     current: 2000000,
//     target: 2200000,
//     date: new Date(2024, 2, 23),
//     category: 'Holiday',
//     attendants: [1, 2, 3],
//     createdBy: 1
//   },
//   {
//     id: 6,
//     name: 'Saved Money',
//     description: 'Saved Money to win',
//     current: 1800000,
//     target: 4000000,
//     date: new Date(2024, 2, 23),
//     category: 'Salary',
//     attendants: [1, 2, 3],
//     createdBy: 3
//   }
// ];

export const DetailChallengeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as Param;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>({
    _id: '',
    category: '',
    name: '',
    description: '',
    target: 0,
    current: 0,
    attendants: [],
    date: new Date(),
    createdBy: ''
  });
  const [description, setDescription] = useState<string>(currentChallenge.description);
  const [show, setShow] = useState<boolean>(false);
  const [contribution, setContribution] = useState<number>(0);
  const [myContribution, setMyContribution] = useState<number>(0);
  const [userList, setUserList] = useState<any>([]);
  const dispatch: any = useAppDispatch();
  const { challenge } = useAppSelector((state: RootState) => ({ ...state }));
  const { user } = useAppSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    const dispatchAll = async () => {
      await dispatch(getChallengeById({ id: id }));
      await dispatch(getContribution({ id: id }));
    };
    dispatchAll();
  }, []);

  useEffect(() => {
    if (challenge.challenge) {
      setCurrentChallenge(challenge.challenge);
      setUserList(challenge.challenge?.attendants);
    }
    if (challenge.contribution == 0 || challenge.contribution) {
      setContribution(challenge.contribution);
    }
  }, [challenge]);

  const handleContribute = async () => {
    await dispatch(contributeToChallenge({ id: id, amount: myContribution }));
    await dispatch(getChallengeById({ id: id }));
    await dispatch(getContribution({ id: id }));
    await dispatch(getChallenges());
    setModalVisible(!modalVisible);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    icon: {
      width: 60,
      height: 60,
      margin: 10
    },
    selectedIcon: {
      borderWidth: 4,
      borderColor: 'blue',
      borderRadius: 100
    },
    selectedText: {
      fontWeight: 'bold',
      color: 'blue'
    },
    tick: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      fontSize: 24,
      color: 'blue'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center'
    },
    buttonOpen: {
      backgroundColor: '#F194FF'
    },
    buttonClose: {
      backgroundColor: '#2196F3'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    }
  });

  return (
    <Box backgroundColor={'gray.100'} h={'100%'}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              marginBottom={'5'}
              placeholder='Enter target contribution'
              value={myContribution.toString()}
              onChangeText={(value) => setMyContribution(Number(value))}
            />
            <Box display={'flex'} flexDir={'row'} width={'full'} justifyContent={'space-around'}>
              <Pressable
                style={[styles.button, styles.buttonClose, { width: '40%' }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { width: '40%' }]}
                onPress={handleContribute}
              >
                <Text style={styles.textStyle}>Contribute</Text>
              </Pressable>
            </Box>
          </View>
        </View>
      </Modal>
      <Box
        backgroundColor='blue.700'
        px={5}
        pt={10}
        position='relative'
        borderBottomRadius={0}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <ChevronLeftIcon
          style={tw`text-white absolute left-5 top-11`}
          onPress={() => navigation.navigate('Challenge')}
        />
        <Heading color='white' fontSize={20}>
          {currentChallenge.name}
        </Heading>
        <Text color={'white'} mb={'5'}>
          {currentChallenge.attendants.length} Participants
        </Text>
      </Box>

      <Box mx={'auto'} mt={5}>
        <Progress
          w='365'
          h={4}
          shadow={2}
          value={(currentChallenge.current / currentChallenge.target) * 100}
          style={tw`mb-3`}
        />
        <View style={tw`flex-row items-center gap-2 mb-3`}>
          <Text bold>{`${currentChallenge.current / 1000000}M VNĐ`}</Text>
          <Text>{`saved of ${currentChallenge.target / 1000000}M VNĐ`}</Text>
        </View>
      </Box>
      <FormControl paddingX={5}>
        <FormControl.Label>
          <Text fontSize={'2xl'} bold color='black'>
            Description
          </Text>
        </FormControl.Label>
        <Input isReadOnly={true} value={currentChallenge.description} bg={'white'} />
      </FormControl>
      <FormControl paddingX={5} paddingBottom={5}>
        <FormControl.Label>
          <Text fontSize={'2xl'} bold color='black'>
            Your contribution
          </Text>
        </FormControl.Label>
        <Input isReadOnly={true} value={contribution.toString()} bg={'white'} />
      </FormControl>

      <Box display={'flex'} flexDir={'row'} mx={'5'} mb={'3'} justifyContent={'space-around'}>
        <Button
          disabled={currentChallenge.current >= currentChallenge.target}
          w={'40%'}
          backgroundColor='blue.400'
          onPress={() => setModalVisible(true)}
        >
          Contribute
        </Button>
        <Button w={'40%'} backgroundColor='blue.400' onPress={() => navigation.navigate('Share')}>
          Share
        </Button>
      </Box>
      <Text paddingX={5} fontSize={'2xl'} bold color='black'>
        Contributors
      </Text>
      {userList.length > 0 && (
        <FlatList
          backgroundColor='gray.100'
          style={tw`p-5 mb-3`}
          data={userList}
          keyExtractor={(item: any, index) => index.toString()}
          renderItem={({ item }) => (
            <Box
              style={tw`p-5 mb-3`}
              backgroundColor='white'
              borderWidth='1'
              borderColor='coolGray.300'
              rounded={8}
            >
              <View style={tw`flex-row items-center gap-3 justify-around`}>
                <View style={tw`flex-row items-center gap-3`}>
                  <Image
                    src={'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'}
                    alt='Avatar'
                    style={tw`w-10 h-10`}
                  />
                  <View w={'60%'}>
                    <Text bold>{item.name}</Text>
                  </View>
                </View>
                <Text bold>{item.contribution/1000000}M VND</Text>
              </View>
            </Box>
          )}
        />
      )}
      {/* <FlatList
        style={tw`p-3`}
        data={currentAttendants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Box
            style={tw`p-5 mb-5`}
            backgroundColor='white'
            borderWidth='1'
            borderColor='coolGray.300'
            rounded={8}
          >
            <View style={tw`flex-row items-center gap-3`}>
              <Image src={item.image} alt='avatar' style={tw`w-10 h-10`} />
              <View w={'60%'}>
                <Text bold>{item.name}</Text>
                <Text opacity={50}>Đóng ngày 10</Text>
              </View>
              <Text bold>+500.000 VND</Text>
            </View>
          </Box>
        )}
      /> */}
    </Box>
  );
};
