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
  Input,
  Button
} from 'native-base';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  PencilIcon,
  CalendarDaysIcon,
  ViewColumnsIcon,
  WalletIcon
} from 'react-native-heroicons/solid';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createActivity } from 'src/store/reducers/activities';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { Loading } from 'src/components/Loading';

export const AddActivityScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [activity, setActivity] = useState<string>('Expense');
  const [token, setToken] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const activityList = ['Expense', 'Income'];
  const [content, setContent] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };
  const handleAddActivity = async () => {
    setLoading(true)
    await dispatch(createActivity({type: activity, category, content, createdAt: date, amount}));
    setLoading(false)
    navigation.navigate('Home');
  };
  
  const expenseCategoryList = [
    {
      category: 'Transport',
      image: require('../assets/icon-transport.png')
    },
    {
      category: 'Food and Drinks',
      image: require('../assets/icon-food.png')
    },
    {
      category: 'Home',
      image: require('../assets/icon-home.png')
    },
    {
      category: 'Entertainment',
      image: require('../assets/icon-game.png')
    },
    {
      category: 'Health and Beauty',
      image: require('../assets/icon-health.png')
    },
    {
      category: 'Holiday',
      image: require('../assets/icon-holiday.png')
    },
    {
      category: 'Education',
      image: require('../assets/icon-edu.png')
    },
    {
      category: 'Market',
      image: require('../assets/icon-market.png')
    },
    {
      category: 'Shopping',
      image: require('../assets/icon-shopping.png')
    },
    {
      category: 'Dating',
      image: require('../assets/icon-ty.png')
    }
  ];
  const incomeCategoryList = [
    {
      category: 'Salary',
      image: require('../assets/icon-credit.png')
    },
    {
      category: 'Education',
      image: require('../assets/icon-edu.png')
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
      category: 'Other',
      image: require('../assets/icon-other.png')
    }
  ];
  return (
    <Box backgroundColor={'white'}>
    {loading && <Loading/>}
      <Box backgroundColor='blue.700' paddingTop={10} position='relative' borderBottomRadius={50}>
        <Box>
          <ChevronLeftIcon
            style={tw`absolute left-5 top-5 text-white`}
            onPress={() => navigation.navigate('Home')}
          />
        </Box>

        <Heading color='white' textAlign='center' style={tw`mb-5`}>
          Add Activity
        </Heading>
        <Box style={tw`flex-row justify-around`}>
          {activityList.map((item, index) => (
            <Text
              key={index}
              bold
              color='white'
              paddingBottom={3}
              onPress={() => setActivity(item)}
              borderBottomWidth={activity === item ? '4' : '0'}
              borderBottomColor={activity === item ? 'white' : ''}
            >
              {item}
            </Text>
          ))}
        </Box>
      </Box>

      <FormControl padding={5} style={tw`h-full`}>
        <FormControl.Label style={tw`flex-row items-center gap-2`}>
          <Text fontSize={'2xl'} bold color='blue.700'>
            Cateogry
          </Text>
          <Icon as={<ViewColumnsIcon size={16} />} mr='3' color='blue.700' />
        </FormControl.Label>
        <Select
          shadow={2}
          selectedValue={category}
          marginBottom={5}
          placeholder={`Choose ${activity} category`}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {activity === 'Expense'
            ? expenseCategoryList.map((item, index) => (
                <Select.Item key={index} label={item.category} value={item.category} />
              ))
            : incomeCategoryList.map((item, index) => (
                <Select.Item key={index} label={item.category} value={item.category} />
              ))}
        </Select>
        <FormControl.Label style={tw`flex-row items-center gap-2`}>
          <Text fontSize={'2xl'} bold color='blue.700'>
            Contents
          </Text>
          <Icon as={<PencilIcon size={16} />} mr='3' color='blue.700' />
        </FormControl.Label>
        <Input
          marginBottom={5}
          placeholder='Write your conent'
          InputRightElement={<Icon as={<PencilIcon size={16} />} mr='3' />}
          value={content}
          onChangeText={(value) => setContent(value)}
        />
        <View style={tw`flex-row gap-3`} marginBottom={10}>
          <Box width='50%'>
            <FormControl.Label style={tw`flex-row items-center gap-2`}>
              <Text fontSize={'2xl'} bold color='blue.700'>
                Date
              </Text>
              <Icon as={<CalendarDaysIcon size={16} />} mr='3' color='blue.700' />
            </FormControl.Label>
            <Input
              value={date.toLocaleDateString()}
              onPressIn={() => setShow(true)}
              placeholder='Select a date'
            />
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
          </Box>
          <Box width='50%'>
            <FormControl.Label style={tw`flex-row items-center gap-2`}>
              <Text fontSize={'2xl'} bold color='blue.700'>
                Amount
              </Text>
              <Icon as={<WalletIcon size={16} />} mr='3' color='blue.700' />
            </FormControl.Label>
            <Input value={amount.toString()} onChangeText={(value) => setAmount(Number(value))} />
          </Box>
        </View>
        <Button backgroundColor='blue.700' onPress={handleAddActivity}>
          Save
        </Button>
      </FormControl>
    </Box>
  );
};
