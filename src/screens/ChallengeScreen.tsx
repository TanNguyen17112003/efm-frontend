import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, Text, FlatList, View, Input, Pressable, Icon, Progress, Image, ScrollView } from "native-base"
import { PlusCircleIcon, BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import { getAllChallenges } from "@services";
import { getJWT } from "@utils";
import { useCallback, useEffect, useState } from "react";

const iconList = {
    'Salary': {
        category: "Salary",
        image: require('../assets/icon-credit.png')
    },
    'Home': {
        category: "Home",
        image: require('../assets/icon-home.png')
    },
    'Transport': {
        category: "Transport",
        image: require('../assets/icon-transport.png')
    },
    'Food': {
        category: "Food",
        image: require('../assets/icon-food.png')
    },
    'Holiday': {
        category: "Holiday",
        image: require('../assets/icon-holiday.png')
    },
    'Education':{
        category: "Education",
        image: require('../assets/icon-edu.png')
    },
    'Shopping': {
        category: "Shopping",
        image: require('../assets/icon-shopping.png')
    },
    'Other': {
        category: "Other",
        image: require('../assets/icon-other.png')
    },
}

const me = {
    id: 1,
    name: 'Đức Huy',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
}

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

export const ChallengeScreen = () => {
    const navigation = useNavigation();
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
    const [challengeList, setChallengeList] = useState<Challenge[]>(challengeListDummy);

    // useFocusEffect(
    //     useCallback(() => {
    //     const fetchGoalList = async () => {
    //       try {
    //         const data = await getJWT();
    //         if (data) {
    //           const result = await getAllChallenges(data.token);
    //           setChallengeList(result)
    //         }
    //       }
    //       catch(e) {
    //         throw e
    //       }
    //     }
    //     fetchGoalList();
    // }, []))

    const handleViewDetail = (challengeId: number) => {
        navigation.navigate("DetailChallenge", { challengeId })
    }

  return (
    <Box flex={1}>
        <Box backgroundColor="blue.700" style={tw`px-5 pb-5 pt-10`}>
            <Text bold fontSize='2xl' color="white" style={tw`mb-4`}>Challenge with Friends</Text>
            <View style={tw`flex-row items-center gap-3`}>
                <Input 
                    placeholder="Search"  
                    w={{
                        base: "75%",
                        md: "25%",
                    }} 
                    InputRightElement={<Pressable>
                        <Icon as={<MagnifyingGlassIcon />} size={5} mr="2" color="muted.400" />
                    </Pressable>}
                    type="text" 
                    backgroundColor='white'
                />
                <PlusCircleIcon size={26} color="lightblue" onPress={() => navigation.navigate("AddChallenge")}/>
                <BellIcon size={26} color="white" />
            </View>
        </Box>

        <SafeAreaView style={{flex: 1, backgroundColor: '#d1d5db'}}>
        <FlatList
            backgroundColor='gray.300'
            style={tw`p-3`}
            data={challengeList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
            <Box style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8} onTouchStart={() => handleViewDetail(item.id)}>
                    <View style={tw`flex-row items-center gap-3 mb-3`}>
                        <Image source={iconList[item.category as keyof typeof iconList].image} alt="Category" style={tw`w-10 h-10`} />
                        <View>
                            <Text bold>{item.name}</Text>
                            <Text opacity={50}>{`${formatter.format(item.date)}, ${item.date.getFullYear()}`}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row items-center gap-2 mb-3`}>
                        <Text bold fontSize='2xl'>{`${item.current / 1000000}M VNĐ`}</Text>
                        <Text>{`saved of ${item.target / 1000000}M VNĐ`}</Text>
                    </View>
                    <Progress w="300" shadow={2} value={item.current / item.target * 100} style={tw`mb-3`}/>
                    <Text bold>{item.description}</Text>
            </Box>
            )}
        />
        </SafeAreaView>
    </Box>
  )
}