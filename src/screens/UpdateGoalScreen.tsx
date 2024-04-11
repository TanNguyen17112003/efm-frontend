import { Box, Text, FlatList, View,Heading, Input, Button, Icon,FormControl, Progress,ChevronLeftIcon,  ScrollView } from "native-base"
import { PlusCircleIcon, BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid"
import tw from 'twrnc';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const UpdateGoalScreen = () => {
    const navigation = useNavigation();
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
    const goalInfo =
        {
            title: 'Get Married',
            currentMoney: 2000000,
            totalMoney: 20000000,
            date: new Date(2024, 10, 10),
            category: require('../assets/icon-ty.png')
        }
    const [current, updateCurrent] = useState<number>(goalInfo.currentMoney);    
    return (
        <Box backgroundColor={"white"}>
          <Box backgroundColor="blue.700" paddingTop={70} position="relative" borderBottomRadius={0}>
          <Box><ChevronLeftIcon style={tw`absolute left-5 top-5 text-white`} onPress={() => navigation.navigate("Goal")}/></Box>   
            <Heading color="white" textAlign="center" style={tw`mb-5`}>Update goal</Heading>
          </Box>
          <Box style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
                    <View style={tw`flex-row items-center gap-3 mb-3`}>
                        <Image source={goalInfo.category} alt="Category" style={tw`w-20 h-20 ml-10`} />
                        <View style={{ alignItems: 'center' }}>
                            <Text bold fontSize='2xl'>{goalInfo.title}</Text>
                            <Text opacity={50}>{`${formatter.format(goalInfo.date)}, ${goalInfo.date.getFullYear()}`}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row items-center gap-2 mb-3`}>
                        <Text bold fontSize='2xl'>{`${goalInfo.currentMoney / 1000000}M VNĐ`}</Text>
                        <Text>{`saved of ${goalInfo.totalMoney / 1000000}M  VNĐ`}</Text>
                    </View>
                    <Progress w="300" shadow={2} value={goalInfo.currentMoney / goalInfo.totalMoney * 100} style={tw`mb-3`}/>
               </Box>
               <FormControl padding={5} style={tw`h-full`}>
                <FormControl.Label><Text fontSize={"2xl"} bold color="black.700">Update Goal</Text></FormControl.Label>
                <Input
                placeholder= 'Enter update money'
                placeholderTextColor='rgba(204, 204, 204, 0.5)'
                value={current.toString()}
                onChangeText={(value) => updateCurrent(Number(value))}
                />   
            <Button marginTop={8} padding={5}  backgroundColor="blue.400">Update</Button>    
            </FormControl>
        
        </Box>
      )
}