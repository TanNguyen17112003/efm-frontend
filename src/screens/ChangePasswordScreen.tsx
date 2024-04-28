import tw from 'twrnc';
import { Box, Text, Icon, View, Heading, ChevronLeftIcon, FormControl, Input, Button, Pressable, WarningOutlineIcon } from "native-base"
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon } from 'react-native-heroicons/solid';
import { getJWT } from '@utils';

const me = {
    id: 1,
    name: 'Đức Huy',
    email: 'huy@gmail.com',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png',
}

type Error = {
    current: string,
    new: string,
    confirm: string,
}

export default function ChangePasswordScreen() {
    const navigation = useNavigation()
    const [isSubmit, setIsSubmit] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [error, setError] = useState<Error>({
        current: '',
        new: '',
        confirm: '',
    })

    useEffect(() => {
        if (currentPassword && newPassword && confirmPassword) {
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
    }, [currentPassword, newPassword, confirmPassword])

    const handleSubmit = () => {
        // Some validations
        if (newPassword !== confirmPassword){
            setError({
                ...error,
                confirm: 'Confirm Password And New Password Have To Match!',
            })
            return
        }
        
        if (newPassword === currentPassword) {
            setError({
                ...error,
                new: 'Please Choose A New Password That Is Different From Your Old Password!',
            })
            return
        }

        setIsSubmit(false)
        // Call Api To Change Password Here
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
            >
                <ChevronLeftIcon style={tw`text-white absolute left-5 top-11`} onPress={() => navigation.goBack()}/> 
                <Heading color="white" marginBottom='5'>Change Password</Heading>
            </Box>

            <Box
                mt={5}
                ml={5}
                mr={5}
                w={'90%'}
            >
                <FormControl isInvalid={!!error.current} w="100%" mt={5}>
                    <FormControl.Label>
                        <Text bold color={'black'} fontSize={'18px'}>
                            Current Password
                        </Text>
                    </FormControl.Label>
                    <Input
                        type={showCurrent ? 'text' : 'password'}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        onChange={() => setError({
                            ...error,
                            current: '',
                        })}
                        px={4}
                        InputRightElement={
                            <Pressable onPress={() => setShowCurrent(!showCurrent)}>
                                <Icon mr={3} as={<EyeIcon />} color="black" />
                            </Pressable>
                        }
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        <Text>{error.current}</Text>
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!error.new} w="100%" mt={5}>
                    <FormControl.Label>
                        <Text bold color={'black'} fontSize={'18px'}>
                            New Password
                        </Text>
                    </FormControl.Label>
                    <Input
                        type={showNew ? 'text' : 'password'} 
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        onChange={() => setError({
                            ...error,
                            new: '',
                        })}
                        px={4}
                        InputRightElement={
                            <Pressable onPress={() => setShowNew(!showNew)}>
                                <Icon mr={3} as={<EyeIcon />} color="black" />
                            </Pressable>
                        }
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        <Text>{error.new}</Text>
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!error.confirm} w="100%" mt={5}>
                    <FormControl.Label>
                        <Text bold color={'black'} fontSize={'18px'}>
                            Confirm Password
                        </Text>
                    </FormControl.Label>
                    <Input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onChange={() => setError({
                            ...error,
                            confirm: '',
                        })}
                        px={4}
                        InputRightElement={
                            <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                                <Icon mr={3} as={<EyeIcon />} color="black" />
                            </Pressable>
                        }
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        <Text>{error.confirm}</Text>
                    </FormControl.ErrorMessage>
                </FormControl>

                {isSubmit ? 
                    <Box mt={'45px'}>
                        <Button backgroundColor="blue.700" onPress={handleSubmit}>Save</Button>
                    </Box>
                    :
                    <></>
                }
            </Box>
        </Box>
    )
}