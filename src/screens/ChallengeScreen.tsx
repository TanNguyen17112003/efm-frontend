import { Box, Text, FlatList, View, Input, Pressable, Icon, Progress, Image, ScrollView } from "native-base"
import { PlusCircleIcon, BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid"
import tw from 'twrnc';
export const ChallengeScreen = () => {
    const challengeList = [
        {
            title: 'Saved Money for Dinner LandMark',
            subtitle: 'Week in SaiGon',
            currentMoney: 2000000,
            totalMoney: 5200000,
            date: 'Mar 20, 2024',
            category: require('../assets/icon-food.png')
        },
        {
            title: 'Saved Money for Vung Tau',
            subtitle: 'Week in Vung Tau',
            currentMoney: 2000000,
            totalMoney: 2200000,
            date: 'Mar 23, 2024',
            category: require('../assets/icon-holiday.png')
        },
        {
            title: 'Saved Money',
            subtitle: 'Saved Money to win',
            currentMoney: 1800000,
            totalMoney: 4000000,
            date: 'Feb 20, 2024',
            category: require('../assets/icon-credit.png')
        }
    ]
  return (
    <Box>
        <Box backgroundColor="blue.700" style={tw`p-5`}>
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
                <PlusCircleIcon size={26} color="lightblue"/>
                <BellIcon size={26} color="white" />
            </View>
        </Box>

        <ScrollView h="520">
        <FlatList
            backgroundColor='gray.300'
            style={tw`p-3`}
            data={challengeList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
               <Box style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
                    <View style={tw`flex-row items-center gap-3 mb-3`}>
                        <Image source={item.category} alt="Category" style={tw`w-10 h-10`} />
                        <View>
                            <Text bold>{item.title}</Text>
                            <Text opacity={50}>{item.date}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row items-center gap-2 mb-3`}>
                        <Text bold fontSize='2xl'>{`${item.currentMoney.toLocaleString('de-DE')} VNĐ`}</Text>
                        <Text>{`saved of ${item.totalMoney.toLocaleString('de-DE')} VNĐ`}</Text>
                    </View>
                    <Progress w="300" shadow={2} value={item.currentMoney / item.totalMoney * 100} style={tw`mb-3`}/>
                    <Text bold>{item.subtitle}</Text>
               </Box>
            )}
        />
        </ScrollView>

    </Box>
  )
}

