import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Box,
  Text,
  FlatList,
  View,
  Input,
  Pressable,
  Icon,
  Progress,
  Image,
  ScrollView,
  Button
} from 'native-base';
import { PlusCircleIcon, BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { getAllChallenges } from '@services';
import { getJWT } from '@utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer } from '@components';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import {
  attendChallenge,
  contributeToChallenge,
  getChallenges,
  getFriendChallenges
} from 'src/store/reducers/challenges';
import { RootState } from 'src/store';

const iconList = {
  Salary: {
    category: 'Salary',
    image: require('../assets/icon-credit.png')
  },
  Home: {
    category: 'Home',
    image: require('../assets/icon-home.png')
  },
  Transport: {
    category: 'Transport',
    image: require('../assets/icon-transport.png')
  },
  Food: {
    category: 'Food',
    image: require('../assets/icon-food.png')
  },
  Holiday: {
    category: 'Holiday',
    image: require('../assets/icon-holiday.png')
  },
  Education: {
    category: 'Education',
    image: require('../assets/icon-edu.png')
  },
  Shopping: {
    category: 'Shopping',
    image: require('../assets/icon-shopping.png')
  },
  Other: {
    category: 'Other',
    image: require('../assets/icon-other.png')
  },
  Test: {
    category: 'Test',
    image: require('../assets/icon-other.png')
  }
};

export const ChallengeScreen = () => {
  const navigation: any = useNavigation();
  const tabs = ['My Challenges', 'Friend Challenges'];
  const [tab, setTab] = useState<string>('My Challenges');
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
  const [challengeList, setChallengeList] = useState<Challenge[]>([]);
  const dispatch = useAppDispatch();
  const { challenge } = useAppSelector((state: RootState) => ({ ...state }));
  const { user } = useAppSelector((state: RootState) => ({ ...state }));
  const category = [
    'Salary',
    'Home',
    'Transport',
    'Food',
    'Holiday',
    'Shopping',
    'Education',
    'Other'
  ];
  useEffect(() => {
    const dispatchAll = async () => {
      await dispatch(getChallenges());
      await dispatch(getFriendChallenges());
    };
    dispatchAll();
  }, []);

  useEffect(() => {
    if (challenge.challenges) {
      if (tab === 'My Challenges') {
        setChallengeList(challenge.challenges);
      } else {
        setChallengeList(challenge.friendChallenges);
      }
    }
  }, [challenge, tab]);

  const handleViewDetail = (challengeId: string) => {
    navigation.navigate('DetailChallenge', { id: challengeId });
  };
  useMemo(async () => {
    if (tab === 'My Challenges') {
      if (challenge.challenges) {
        setChallengeList(challenge.challenges);
      }
    } else {
      setChallengeList(challenge.friendChallenges);
    }
  }, [tab]);

  const handleJoinChallenges = async (id: string) => {
    await dispatch(attendChallenge({ id }));
    await dispatch(contributeToChallenge({ id: id, amount: 0 }));
    await dispatch(getFriendChallenges());
  };

  function checkJoin(id: string) {
    let flag = false;
    challengeList.map((item: Challenge) => {
      if (item._id == id) {
        item.attendants.map((id: any) => {
          if (id === user.id) flag = true;
        });
      }
    });
    return flag;
  }
  const checkCategory = (cat: string) => {
    for (let i in category) {
      if (i == cat) return true;
    }
    return false;
  };
  return (
    <Box flex={1}>
      <Box backgroundColor='blue.700' style={tw`px-5 pb-5 pt-10`}>
        <Text bold fontSize='2xl' color='white' style={tw`mb-4`}>
          Challenge with Friends
        </Text>
        <View style={tw`flex-row items-center gap-5 justify-around`}>
          {tabs.map((item, index) => (
            <Box
              key={index}
              borderBottomWidth={tab === item ? '4' : '0'}
              borderBottomColor={tab === item ? 'white' : ''}
            >
              <Text bold color='white' paddingBottom={3} onPress={() => setTab(item)}>
                {item}
              </Text>
            </Box>
          ))}
          {/* <Input
            placeholder='Search'
            w={{
              base: '75%',
              md: '25%'
            }}
            InputRightElement={
              <Pressable>
                <Icon as={<MagnifyingGlassIcon />} size={5} mr='2' color='muted.400' />
              </Pressable>
            }
            type='text'
            backgroundColor='white'
          /> */}
          <PlusCircleIcon
            size={30}
            color='lightblue'
            onPress={() => navigation.navigate('AddChallenge')}
          />
        </View>
      </Box>
      {challengeList.length == 0 && (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#d1d5db' }}>
          <Box style={tw`flex-row items-center justify-center`}>
            <Text fontSize={28} color={'red.700'} bold>
              You do not have any challenges yet.
            </Text>
          </Box>
        </SafeAreaView>
      )}
      {challengeList.length > 0 && (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#d1d5db' }}>
          <FlatList
            backgroundColor='gray.300'
            style={tw`p-3`}
            data={challengeList}
            keyExtractor={(item: any, index) => index.toString()}
            renderItem={({ item }: { item: Challenge }) =>
              ((checkJoin(item._id) && tab === 'My Challenges') ||
                (!checkJoin(item._id) && tab != 'My Challenges')) && (
                <Pressable
                  onPress={() => {
                    tab === 'My Challenges' ? handleViewDetail(item._id) : {};
                  }}
                >
                  <Box
                    style={tw`p-5 mb-5`}
                    backgroundColor='white'
                    borderWidth='1'
                    borderColor='coolGray.300'
                    rounded={8}
                  >
                    <View style={tw`flex-row items-center justify-between mb-3`}>
                      <View style={tw`flex-row items-center gap-3`}>
                        <Image
                          source={
                            item.category
                              ? iconList[
                                  (checkCategory(item.category)
                                    ? item.category
                                    : 'Other') as keyof typeof iconList
                                ].image
                              : require('../assets/icon-other.png')
                          }
                          alt='Category'
                          style={tw`w-10 h-10`}
                        />
                        <View>
                          <Text bold>{item.name}</Text>
                          <Text
                            opacity={50}
                          >{`${formatter.format(new Date(item.date))}, ${new Date(item.date).getFullYear()}`}</Text>
                        </View>
                      </View>
                      {!checkJoin(item._id) ? (
                        <Button
                          w={'30%'}
                          backgroundColor='blue.400'
                          onPress={async () => await handleJoinChallenges(item._id)}
                        >
                          Join
                        </Button>
                      ) : (
                        <Button w={'30%'} backgroundColor='gray.400'>
                          Joined
                        </Button>
                      )}
                    </View>

                    <View style={tw`flex-row items-center gap-2 mb-3`}>
                      <Text bold fontSize='2xl'>{`${item.current / 1000000}M VNĐ`}</Text>
                      <Text>{`saved of ${item.target / 1000000}M VNĐ`}</Text>
                    </View>
                    <Progress
                      w='300'
                      shadow={2}
                      value={(item.current / item.target) * 100}
                      style={tw`mb-3`}
                    />
                    <Text bold>{item.description}</Text>
                  </Box>
                </Pressable>
              )
            }
          />
        </SafeAreaView>
      )}

      <Drawer />
    </Box>
  );
};
