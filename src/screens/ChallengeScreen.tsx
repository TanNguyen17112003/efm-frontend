import { useNavigation } from "@react-navigation/native";
import { Box, Text, FlatList, View, Input, Pressable, Icon, Progress, Image, ScrollView } from "native-base"
import { PlusCircleIcon, BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

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

const challengeList = [
    {
        title: 'Saved Money for Dinner LandMark',
        subtitle: 'Week in SaiGon',
        currentMoney: 2000000,
        totalMoney: 5200000,
        date: new Date(2024, 2, 23),
        category: 'Food',
    },
    {
        title: 'Saved Money for Vung Tau',
        subtitle: 'Week in Vung Tau',
        currentMoney: 2000000,
        totalMoney: 2200000,
        date: new Date(2024, 2, 23),
        category: 'Holiday'
    },
    {
        title: 'Saved Money',
        subtitle: 'Saved Money to win',
        currentMoney: 1800000,
        totalMoney: 4000000,
        date: new Date(2024, 2, 23),
        category: 'Salary'
    },
    {
        title: 'Saved Money for Dinner LandMark',
        subtitle: 'Week in SaiGon',
        currentMoney: 2000000,
        totalMoney: 5200000,
        date: new Date(2024, 2, 23),
        category: 'Food',
    },
    {
        title: 'Saved Money for Vung Tau',
        subtitle: 'Week in Vung Tau',
        currentMoney: 2000000,
        totalMoney: 2200000,
        date: new Date(2024, 2, 23),
        category: 'Holiday'
    },
    {
        title: 'Saved Money',
        subtitle: 'Saved Money to win',
        currentMoney: 1800000,
        totalMoney: 4000000,
        date: new Date(2024, 2, 23),
        category: 'Salary'
    },
]

export const ChallengeScreen = () => {
    const navigation = useNavigation();
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });

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
            <Box style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
                    <View style={tw`flex-row items-center gap-3 mb-3`}>
                        <Image source={iconList[item.category as keyof typeof iconList].image} alt="Category" style={tw`w-10 h-10`} />
                        <View>
                            <Text bold>{item.title}</Text>
                            <Text opacity={50}>{`${formatter.format(item.date)}, ${item.date.getFullYear()}`}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row items-center gap-2 mb-3`}>
                        <Text bold fontSize='2xl'>{`${item.currentMoney / 1000000}M VNĐ`}</Text>
                        <Text>{`saved of ${item.totalMoney / 1000000}M VNĐ`}</Text>
                    </View>
                    <Progress w="300" shadow={2} value={item.currentMoney / item.totalMoney * 100} style={tw`mb-3`}/>
                    <Text bold>{item.subtitle}</Text>
            </Box>
            )}
        />
        </SafeAreaView>
    </Box>
  )
}