import tw from 'twrnc';
import { Box, Text, Icon, View, Heading, ChevronLeftIcon, FormControl, Input, Button, Pressable } from "native-base"
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PencilSquareIcon } from 'react-native-heroicons/solid';
import { getJWT } from '@utils';

const me = {
    id: 1,
    name: 'Đức Huy',
    email: 'huy@gmail.com',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
}

export default function AboutScreen() {
    const navigation = useNavigation()
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState(me.name)
    const [data, setData] = useState(me)

    const handleSave = () => {
        setIsEdit(false)
        // Call Api To Change Name Here
    }
 
    return (
        <Box backgroundColor={"white"} h={'100%'}>
            <Box
                backgroundColor="blue.700"
                px={5}
                pt={10}
                position="relative"
                borderBottomRadius={0}
                display='flex'
                alignItems='center'
                h={160}
            >
                <ChevronLeftIcon style={tw`text-white absolute left-5 top-11`} onPress={() => navigation.goBack()}/> 
                <Heading color="white" marginBottom='5'>About</Heading>
                <Image
                    src={data.image}
                    alt="Avatar"
                    style={tw`w-30 h-30 border-4 border-white rounded-full bg-white`}
                />
                <Box>
                    <Text bold fontSize={'2xl'}>{data.name}</Text>
                </Box>
            </Box>

            <Box
                mt={100}
                ml={5}
                mr={5}
                w={'90%'}
            >
                <FormControl w="100%">
                    <FormControl.Label>
                        <Text bold color={'black'} fontSize={'18px'}>
                            Name
                        </Text>
                    </FormControl.Label>
                    <Input
                        isReadOnly={!isEdit}
                        variant="underlined"
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        px={4}
                        InputRightElement={!isEdit ?
                            <Pressable onPress={() => setIsEdit(true)}>
                                <Icon as={<PencilSquareIcon />} color="black" />
                            </Pressable>
                            :
                            <></>
                        }
                    />
                </FormControl>

                <FormControl w="100%" mt={5}>
                    <FormControl.Label>
                        <Text bold color={'black'} fontSize={'18px'}>
                            Email
                        </Text>
                    </FormControl.Label>
                    <Input
                        isReadOnly
                        variant="underlined"
                        placeholder="Email"
                        value={data.email}
                        px={4}
                    />
                </FormControl>

                {isEdit ? 
                    <Box mt={'45px'}>
                        <Button backgroundColor="blue.700" onPress={handleSave}>Save</Button>
                    </Box>
                    :
                    <></>
                }
            </Box>
        </Box>
    )
}