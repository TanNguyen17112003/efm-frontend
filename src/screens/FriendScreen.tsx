import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useMemo } from 'react';
import { Box, Text, FlatList, View, Input, Pressable, Icon, Progress, Image, ScrollView, ChevronLeftIcon, Heading } from "native-base"
import { PlusCircleIcon, BellIcon, MagnifyingGlassIcon, TrashIcon, UserIcon, CheckIcon, PlusIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

type User = {
    name: string,
    image: string,
}

const invitationList = [
    {
        name: 'Tuấn Khanh',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'Minh Lộc',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'Duy Tân',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'Nguyễn Hùng',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'Đức Huy',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'Vân Anh',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'Đức Huy',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'Vân Anh',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
]

const suggestionList = [
    {
        name: 'A',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'B',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'C',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'D',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'E',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'F',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'E',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
    {
        name: 'F',
        image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
    },
]


export const FriendScreen = () => {
    const navigation = useNavigation();
    const tabs = ["Invitations", "Suggestions"];
    const [tab, setTab] = useState<string>('Invitations');
    const [dataList, setDataList] = useState<User[]>(invitationList);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    useMemo(() => {
        if (tab === "Invitations") {
            setIsExpanded(false);
            setDataList(invitationList)
        } else {
            setIsExpanded(false);
            setDataList(suggestionList)
        }
    }, [tab])

    return (
        <Box flex={1}>
            <Box
                backgroundColor="blue.700"
                style={tw`px-5 pt-10`}
                position="relative"
                display={'flex'}
                flexDir={'column'}
                alignItems={'center'}
                w={'100%'}
            >   
                <Box><ChevronLeftIcon style={{ left: -170, top: 5, color: 'white', position: 'absolute' }} onPress={() => navigation.navigate("Menu")} /></Box>  
                <Heading bold fontSize='2xl' color="white" style={tw`mb-4`}>Discover</Heading>
                
                <Input 
                    placeholder="Search"  
                    w={{
                        base: "85%",
                        md: "25%",
                    }} 
                    InputRightElement={<Pressable>
                        <Icon as={<MagnifyingGlassIcon />} size={5} mr="2" color="muted.400" />
                    </Pressable>}
                    type="text" 
                    backgroundColor='white'
                />
                <Box style={tw`flex-row justify-around`} w={'100%'} mt={4}>
                    {tabs.map((item, index) => (    
                        <Box
                            key={index}
                            borderBottomWidth={tab === item ? "4" : "0"}
                            borderBottomColor={tab === item ? "white" : ""}
                        >
                            <Text
                                bold
                                color="white"
                                paddingBottom={3}
                                onPress={() => setTab(item)}
                            >
                                {item}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </Box>

            <SafeAreaView style={{flex: 1, backgroundColor: '#d1d5db'}}>
                <Box
                    backgroundColor='gray.300'
                    style={tw`px-3 py-4`}
                    w={'100%'}
                >
                    <Text bold fontSize={18}>Your {tab} {tab === 'Invitations' ? `(${dataList.length})` : ''}</Text>
                </Box>

                <FlatList
                    scrollEnabled={isExpanded}
                    backgroundColor='gray.300'
                    style={isExpanded ? tw`p-3 mb-3`: tw`p-3`}
                    data={dataList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <Box style={tw`p-5 mb-3`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
                            <View style={tw`flex-row items-center gap-3`}>
                                <Image src={item.image} alt="Avatar" style={tw`w-10 h-10`} />
                                <View w={'65%'}>
                                    <Text bold>{item.name}</Text>
                                    <Text opacity={50}>Sent you an invitation</Text>
                                </View>
                                {tab === 'Invitations' ? 
                                    <CheckIcon size={20} color={'green'} />
                                    :
                                    <PlusIcon size={20} color={'blue'} />
                                }
                                <TrashIcon size={20} color={'red'}/>
                            </View>
                        </Box>
                    )}
                />

                { !isExpanded && dataList.length > 6 ?
                    <Box
                        backgroundColor='gray.300'
                        style={tw`px-3 pb-10 pt-2`}
                        w={'100%'}
                        position={'relative'}
                    >
                        <Text position={'absolute'} right={4} bold fontSize={15} onPress={() => setIsExpanded(true)}>Show more...</Text>
                    </Box>
                    :
                    <></>
                }
            </SafeAreaView>  
        </Box>
    )
}