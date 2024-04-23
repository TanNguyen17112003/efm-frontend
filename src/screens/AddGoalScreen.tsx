import tw from 'twrnc';
import { Box, View, Text, Icon, Heading, ChevronLeftIcon, FormControl, Select, Input, Button, Image } from "native-base"
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarDaysIcon, PencilIcon, ViewColumnsIcon, WalletIcon } from 'react-native-heroicons/solid';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createGoal } from '@services';
import { getJWT } from '@utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const AddGoalScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [target, setTarget] = useState<number>(0);
  const [saved, setSaved] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const handleAddGoal = () => {
    createGoal(
      token,
      category,
      title,
      date,
      target,
      saved
    );
    navigation.navigate("Goal");
  }
  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };
  const [selectedIcon, setSelectedIcon] = useState(null);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    icon: {
      width: 60,
      height: 60,
      margin: 10,
    },
    selectedIcon: {
      borderWidth: 4,
      borderColor: 'blue',
    },
    tick: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      fontSize: 24,
      color: 'blue',
    },
  });
  const iconList = [
    {
      category: "Salary",
      image: require('../assets/icon-credit.png')
    },
    {
      category: "Holiday",
      image: require('../assets/icon-holiday.png')
    },
    {
      category: "Shopping",
      image: require('../assets/icon-shopping.png')
    },
    {
      category: "Food and Drinks",
      image: require('../assets/icon-food.png')
    },
    {
      category: "Education",
      image: require('../assets/icon-edu.png')
    },
    {
      category: "Transport_2",
      image: require('../assets/icon-transport-2.png')
    },
    {
      category: "Venue",
      image: require('../assets/icon-venue.png')
    },
    {
      category: "Dating",
      image: require('../assets/icon-ty.png')
    },
  ]
  useEffect(() => {
    const getToken = async () => {
      const data = await getJWT();
      if(data) {
        setToken(data.token)
      }
    }
    getToken()
  },[])
  return (
    <Box backgroundColor={"white"}>
      <Box backgroundColor="blue.700" paddingX={5} paddingTop={10} position="relative" borderBottomRadius={0} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
  <ChevronLeftIcon style={tw`text-white absolute left-5`} onPress={() => navigation.navigate("Goal")}/> 
  <Heading color="white" marginBottom='5'>Add Goal</Heading>
</Box>

      <FormControl padding={5}>
        <FormControl.Label style={tw`flex-row items-center gap-2`}>
          <Text fontSize={"2xl"} bold color="blue.700">Category</Text>
          <Icon as={<ViewColumnsIcon size={16}/>} mr="3" color="blue.700" />
        </FormControl.Label>
        <Select 
          shadow={2} 
          selectedValue={category} 
          marginBottom={5} 
          placeholder={`Choose goal category`}
          onValueChange={(itemValue) => setCategory(itemValue)}

        >
          {iconList.map((item, index) => (
            <Select.Item key={index} label={item.category} value={item.category} />
          )) 
          }
        </Select>
        <FormControl.Label style={tw`flex-row items-center gap-2`}>
          <Text fontSize={"2xl"} bold color="blue.700">Goal Title</Text>
          <Icon as={<PencilIcon size={16}/>} mr="3" color="blue.700" />
        </FormControl.Label>
        <Input placeholder='Write your goal title' value={title} onChangeText={setTitle} marginBottom={5}/>
        <FormControl.Label style={tw`flex-row items-center gap-2`}>
          <Text fontSize={"2xl"} bold color="blue.700">Goal date</Text>
          <Icon as={<CalendarDaysIcon size={16}/>} mr="3" color="blue.700"/>
        </FormControl.Label>
            <Input 
              value={date.toLocaleDateString()} 
              onPressIn={() => setShow(true)}
              placeholder="Select a date"
              marginBottom={5}
            />
          {show && (
      <RNDateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    )}
        <View style={tw`flex-row items-center justify-center gap-2`} >
          <Box width={'50%'}>
          <FormControl.Label style={tw`flex-row items-center gap-2`}>
            <Text fontSize={"2xl"} bold color="blue.700">Goal target</Text>
            <Icon as={MaterialCommunityIcons} name='bullseye-arrow' size={5} color="blue.700"/>
          </FormControl.Label>
            <Input
              placeholder='Enter target money'
              value={target.toString()}
              onChangeText={(value) => setTarget(Number(value))}
            />
          </Box>
        <Box width={'50%'}>
        <FormControl.Label style={tw`flex-row items-center gap-2`}>
          <Text fontSize={"2xl"} bold color="blue.700">Goal current</Text>
          <Icon as={<WalletIcon size={16}/>} mr="3" color="blue.700"/>
        </FormControl.Label>
            <Input
              placeholder='Enter saved money'
              value={saved.toString()}
              onChangeText={(value) => setSaved(Number(value))}
            />
        </Box>
        </View>
        <Button marginY={10} backgroundColor="blue.800" onPress={handleAddGoal}>Create</Button>
      </FormControl>

    </Box>
  )
}
