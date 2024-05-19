import tw from 'twrnc';
import {
  Box,
  Text,
  Icon,
  View,
  Heading,
  ChevronLeftIcon,
  FormControl,
  Select,
  ScrollView,
  Input,
  Button,
  HStack
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { getJWT } from '@utils';
import { useAppDispatch } from 'src/hooks/redux';
import { createChallenge, getChallenges } from 'src/store/reducers/challenges';
import { Loading } from 'src/components/Loading';

export const AddChallengeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [token, setToken] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [target, setTarget] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const handleAddChallenge = async () => {
    setLoading(true);
    await dispatch(
      createChallenge({
        category,
        name,
        description,
        date,
        target,
        current: 0
      })
    );
    await dispatch(getChallenges());
    setLoading(false);
    navigation.navigate('Challenge');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    icon: {
      width: 60,
      height: 60,
      margin: 10
    },
    selectedIcon: {
      borderWidth: 4,
      borderColor: 'blue',
      borderRadius: 100
    },
    selectedText: {
      fontWeight: 'bold',
      color: 'blue'
    },
    tick: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      fontSize: 24,
      color: 'blue'
    }
  });
  const iconList1 = [
    {
      category: 'Salary',
      image: require('../assets/icon-credit.png')
    },
    {
      category: 'Home',
      image: require('../assets/icon-home.png')
    },
    {
      category: 'Transport',
      image: require('../assets/icon-transport.png')
    },
    {
      category: 'Food',
      image: require('../assets/icon-food.png')
    }
  ];

  const iconList2 = [
    {
      category: 'Holiday',
      image: require('../assets/icon-holiday.png')
    },
    {
      category: 'Education',
      image: require('../assets/icon-edu.png')
    },
    {
      category: 'Shopping',
      image: require('../assets/icon-shopping.png')
    },
    {
      category: 'Other',
      image: require('../assets/icon-other.png')
    }
  ];

  return (
    <Box backgroundColor={'white'} h={'100%'}>
      {loading && <Loading />}

      <Box
        backgroundColor='blue.700'
        px={5}
        pt={10}
        position='relative'
        borderBottomRadius={0}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <ChevronLeftIcon
          style={tw`text-white absolute left-5 top-11`}
          onPress={() => navigation.navigate('Challenge')}
        />
        <Heading color='white' marginBottom='5'>
          Add Challenge
        </Heading>
      </Box>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }}>
        <FormControl padding={5}>
          <FormControl.Label>
            <Text fontSize={'2xl'} bold color='black'>
              Choose Category
            </Text>
          </FormControl.Label>

          <HStack space={1} my={5}>
            {iconList1.map((item, index) => (
              <Box
                key={index}
                display={'flex'}
                alignItems={'center'}
                w={'25%'}
                onTouchStart={() => setCategory(item.category)}
              >
                <Image
                  source={item.image}
                  style={category === item.category ? styles.selectedIcon : {}}
                />
                <Text style={category === item.category ? styles.selectedText : {}} mt={2}>
                  {item.category}
                </Text>
              </Box>
            ))}
          </HStack>

          <HStack space={1} my={5}>
            {iconList2.map((item, index) => (
              <Box
                key={index}
                display={'flex'}
                alignItems={'center'}
                w={'25%'}
                onTouchStart={() => setCategory(item.category)}
              >
                <Image
                  source={item.image}
                  style={category === item.category ? styles.selectedIcon : {}}
                />
                <Text style={category === item.category ? styles.selectedText : {}} mt={2}>
                  {item.category}
                </Text>
              </Box>
            ))}
          </HStack>
          <FormControl.Label>
            <Text fontSize={'2xl'} bold color='black'>
              Challenge Name
            </Text>
          </FormControl.Label>
          <Input placeholder='Write your goal title' value={name} onChangeText={setName} />

          <FormControl.Label>
            <Text fontSize={'2xl'} bold color='black'>
              Challenge Description
            </Text>
          </FormControl.Label>
          <Input
            placeholder='Write your goal title'
            value={description}
            onChangeText={setDescription}
          />

          <FormControl.Label>
            <Text fontSize={'2xl'} bold color='black'>
              Challenge date
            </Text>
          </FormControl.Label>
          <Box onTouchStart={() => setShow(true)}>
            <Input
              value={date.toLocaleDateString()}
              placeholder='Select a date'
              InputRightElement={
                <Icon as={<CalendarDaysIcon size={16} />} mr='3' color='blue.700' />
              }
              isReadOnly={true}
            />
          </Box>
          {show && (
            <RNDateTimePicker
              testID='dateTimePicker'
              value={date}
              mode='date'
              is24Hour={true}
              display='default'
              onChange={onChange}
            />
          )}

          <FormControl.Label>
            <Text fontSize={'2xl'} bold color='black'>
              Challenge target
            </Text>
          </FormControl.Label>
          <Input
            placeholder='Enter target money'
            value={target.toString()}
            onChangeText={(value) => setTarget(Number(value))}
          />

          <Button marginY={10} backgroundColor='blue.800' onPress={handleAddChallenge}>
            Create Challenge
          </Button>
        </FormControl>
      </ScrollView>
    </Box>
  );
};
