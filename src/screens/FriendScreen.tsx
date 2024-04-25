import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Box, Text, FlatList, View, Input, Pressable, Icon, Progress, Image, ScrollView, ChevronLeftIcon, Heading, Badge, AlertDialog } from "native-base"
import { PlusCircleIcon, BellIcon, MagnifyingGlassIcon, TrashIcon, UserIcon, CheckIcon, PlusIcon } from "react-native-heroicons/solid"
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import { getAllUsers, getInformation, getAllRequests, getAllFriends, acceptFriendRequest, sendFriendRequest } from "@services";
import { getJWT } from "@utils";
import { modifyConfigAsync } from "expo/config";




export const FriendScreen = () => {
    const requestRef = useRef(null);
    const navigation = useNavigation();
    const [denyId, setDenyId] = useState<string | null>(null);
    const [isShowDenyDialog, setIsShowDenyDialog] = useState<boolean>(false);
    const [isShowAcceptDialog, setIsShowAcceptDialog] = useState<boolean>(false);
    const tabs = ["Invitations", "Suggestions"];
    const [tab, setTab] = useState<string>('Invitations');
    const [dataList, setDataList] = useState<User[]>([]);
    const [originalDataList, setOriginalDataList] = useState<User[]>([]);
    const [requestList, setRequestList] = useState<Request[]>([]);
    const [originalRequestList, setOriginalRequestList] = useState<Request[]>([]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const modifyListInvitations = (list: User[], id: string, friendList: Friend[]) => {
        const suggestionExceptFriendList = list.filter((item) => !friendList.some((friend) => friend._id === item.id))
        const suggestionExceptRequestList = suggestionExceptFriendList.filter((item) => !requestList.some((request) => request.from._id === item.id))
        const newList =  suggestionExceptRequestList.map((item) => {
            return {
                ...item,
                image: item.image ? item.image : 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
            }
        })
        const exceptList = newList.filter((item) => item.id !== id)
        setDataList(exceptList)
        setOriginalDataList(exceptList)
    }
    const modifyListRequest = (requestList: Request[]) => {
        const newRequestExceptFriendList = requestList.filter((item) => item.accepted === false)
        const newList = newRequestExceptFriendList.map((item) => {
            return {
                ...item,
                image: item.image ? item.image : 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
            }
        })
        setRequestList(newList)
        setOriginalRequestList(newList)
    }
    useMemo(async () => {
        if (tab === "Invitations") {
            setIsExpanded(false);
            const tokenInfomation = await getJWT();
            if (tokenInfomation) {
                    const requests = await getAllRequests(tokenInfomation.token)
                    modifyListRequest(requests)
                }
        } else {
            setIsExpanded(false);
            const tokenInformation = await getJWT();
            if (tokenInformation) {
                const userId = await getInformation(tokenInformation.token);
                if (userId) {
                    const users = await getAllUsers(tokenInformation.token);
                    const friends = await getAllFriends(tokenInformation.token)
                    modifyListInvitations(users, userId._id, friends)
                }
            }
        }
    }, [tab])
    const handleSearch = async (text: string) => {
        if (text === '') {
            if (tab === "Invitations") {
                const tokenInformation = await getJWT();
                if (tokenInformation) {
                    const requests = await getAllRequests(tokenInformation.token);
                    modifyListRequest(requests)
                }
            } else {
                const tokenInformation = await getJWT();
            if (tokenInformation) {
                const userId = await getInformation(tokenInformation.token);
                if (userId) {
                    const users = await getAllUsers(tokenInformation.token);
                    const friends = await getAllFriends(tokenInformation.token)
                    modifyListInvitations(users, userId._id, friends)
                }
            }
            }
        } else {
           if (tab === 'Invitations') {
                const filterRequestList = originalRequestList.filter((item) => item.from.name.toLowerCase().includes(text.toLowerCase()))
                setRequestList(filterRequestList)
           }
           else {
                const filterDataList = originalDataList.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
                setDataList(filterDataList)
           }
        }
    }
    const handleAcceptInvitaion = async (id: string) => {
       try {
            const tokenInformation = await getJWT();
            if (tokenInformation) {
                const response = await acceptFriendRequest(tokenInformation.token, id);
                const requests = await getAllRequests(tokenInformation.token);
                modifyListRequest(requests)
                setIsShowAcceptDialog(true)
                setTimeout(() => {
                    setIsShowAcceptDialog(false)
                }, 2000)
            }
        } catch (e) {
            console.log(e)
        } 
    }
    const handleSendInvitation = async (id: string) => {
       try {
            const tokenInformation = await getJWT();
            if (tokenInformation) {
                const response = await sendFriendRequest(tokenInformation.token, id);
                console.log(response)
            }
       }
       catch (e) {
        throw e
       }
    }
    const handleDenyInvitationOpen = (id: string) => {
        setDenyId(id);
        setIsShowDenyDialog(true);
    }
    const handleDenyInvitationConfirm = async () => {
        if (denyId) {
            // Perform the denial here using denyId
            // For example:
            // await denyFriendRequest(tokenInformation.token, denyId);
        }
        setDenyId(null);
        setIsShowDenyDialog(false);
    }
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
                    onChangeText={text => handleSearch(text)}
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
                    <Text bold fontSize={18}>Your {tab} {tab === 'Invitations' ? `(${requestList.length})` : `(${dataList.length})`}</Text>
                </Box>

                <FlatList
                    scrollEnabled={isExpanded}
                    backgroundColor='gray.300'
                    style={isExpanded ? tw`p-3 mb-3`: tw`p-3`}
                    data={tab === 'Invitations' ? requestList : dataList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <Box style={tw`p-5 mb-3`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
                            <View style={tw`flex-row items-center gap-3`}>
                                <Image src={item.image} alt="Avatar" style={tw`w-10 h-10`} />
                                <View w={'50%'}>
                                    <Text bold>{tab === 'Invitations' ? item.from.name : item.name}</Text>
                                    {tab === 'Invitations' && <Text opacity={50}>Sent you an invitation</Text>}
                                </View>
                                {tab === 'Invitations' ? 
                                    <TouchableOpacity onPress={() => handleAcceptInvitaion(item._id)}><Badge colorScheme="success">Accept</Badge></TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => handleSendInvitation(item.id)}><Badge colorScheme="primary">Send invitation</Badge></TouchableOpacity>
                                    // <PlusIcon size={20} color={'blue'} onPress={() => handleSendInvitation(item.id)}/>
                                }
                                {tab === 'Invitations' ? <TouchableOpacity onPress={() => handleDenyInvitationOpen(item._id)}><Badge colorScheme="danger">Deny</Badge></TouchableOpacity> : <></>}
                                
                            </View>
                        </Box>
                    )}
                />

                { !isExpanded && ((requestList.length > 4 && tab === 'Invitations') || (dataList.length > 4 && tab === 'Suggestions')) ?
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
              {/* THis is for accept dialog show  */}
            <AlertDialog
                leastDestructiveRef={requestRef}
                isOpen={isShowAcceptDialog}
                onClose={() => setIsShowAcceptDialog(false)}
            >
                <AlertDialog.Content>
                    <AlertDialog.Body>
                        <Heading bold fontSize='2xl' color="green.300" style={tw`mb-4`} textAlign={'center'}>Congratulations</Heading>
                        <Text textAlign={'center'} marginTop={3}>You have accepted the friend request!</Text>
                    </AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
            {/* THis is for deny invitation */}
            <AlertDialog
            leastDestructiveRef={requestRef}
            isOpen={isShowDenyDialog}
            onClose={() => setIsShowDenyDialog(false)}
        >
            <AlertDialog.Content>
                <AlertDialog.Body>
                    <Text marginBottom={3} color={'red.600'} bold textAlign={'center'}> Are you sure you want to deny this invitation?</Text>
                    <Button.Group display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Button onPress={() => setIsShowDenyDialog(false)}>Cancel</Button>
                    <Button colorScheme="red" onPress={handleDenyInvitationConfirm} ml={3}>Deny</Button>
                    </Button.Group>
                 
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
        </Box>
    )
}