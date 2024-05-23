import { useAppSelector } from 'src/hooks/redux';
import { View, Text, Box, Icon, Heading, Select, Button } from 'native-base';
import { PieChart } from 'react-native-chart-kit';
import { RootState } from 'src/store';
import { getRandomColor, getTotalAmount, getAmountOfMonth, getPreviousMonth, generateComment} from '@utils';
import { ChevronLeftIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { CheckIcon } from 'native-base';
import { useAppDispatch } from 'src/hooks/redux';
import tw from 'twrnc';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from 'react-native-heroicons/solid';
import { useState, useEffect } from 'react';
import { getAllActivities } from 'src/store/reducers/activities';

export const DetailChartScreen = () => {
  const navigator = useNavigation();
  const dispatch = useAppDispatch();
  const [listActivity, setListActivity] = useState<DetailActivity[]>([]);
  const { activities, loading, error } = useAppSelector((state: RootState) => state.activity);
  const [inflowDataList, setInflowDataList] = useState<any[]>([]);
  const [outflowDataList, setOutflowDataList] = useState<any[]>([]);
  const [flow, setFlow] = useState<string>('Outflow');
  const [flowMonth, setflowMonth] = useState<string>(
    new Date().toLocaleString('default', { month: 'long' })
  );
  const convertToVND = (amount: number) => {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  };
  const handleSetFlow = () => {
    setFlow(flow === "Outflow" ? 'Inflow' : 'Outflow');
  };
  const modifyListActivities = (activities: any) => {
    const newListActivities = activities.map((activity: any) => {
      return {
        name: activity.category,
        type: activity.type,
        month: new Date(activity.createdAt).toLocaleString('default', { month: 'long' }),
        amount: activity.amount,
        color: getRandomColor(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      };
    });
    setListActivity(newListActivities);
  };
  const modifyInflowDataListBasedOnMonth = (list: DetailActivity[]) => {
    if (!list || list.length === 0) return;
    const newInflowDataList = list.filter(
      (activity: DetailActivity) =>
        activity.month && activity.type === 'Income' && activity.month === flowMonth
    );
    setInflowDataList(newInflowDataList);
  };
  const modifyOutflowDataListBasedOnMonth = (list: DetailActivity[]) => {
    if (!list || list.length === 0) return;
    const newOutflowDataList = list.filter(
      (activity: DetailActivity) =>
        activity.month && activity.type === 'Expense' && activity.month === flowMonth
    );
    setOutflowDataList(newOutflowDataList);
  };
 
  useEffect(() => {
    dispatch(getAllActivities());
  }, []);
  useEffect(() => {
    const handleModify = async () => {
      modifyInflowDataListBasedOnMonth(listActivity);
      modifyOutflowDataListBasedOnMonth(listActivity);
    };
    handleModify();
  }, [flowMonth, activities]);
  useEffect(() => {
    if (activities && activities.length > 0) {
      modifyListActivities(activities);
    }
  }, [activities])
  return (
    <View>
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
          onPress={() => navigator.navigate('Home')}
        />
        <Heading color='white' marginBottom='5'>
          Report
        </Heading>
      </Box>
      <View padding={5}>
        <Box
          paddingX={2}
          paddingY={5}
          backgroundColor={'white'}
          borderRadius={10}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginBottom={3}
        >
          <Icon
            as={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Income") < getTotalAmount(inflowDataList) ? <ArrowUpIcon /> : <ArrowDownIcon />}
            color={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Income") < getTotalAmount(inflowDataList) ? 'green.400' : 'red.400'}
            size={24}
            borderRadius={'full'}
            backgroundColor={'gray.100'}
            padding={5}
          />
          <Text fontWeight={'bold'} fontSize={'xl'}>
            Inflow
          </Text>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text>{`${convertToVND(getTotalAmount(inflowDataList))}`}</Text>
            <Text>
              <Icon as={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Income") < getTotalAmount(inflowDataList) ? ArrowTrendingUpIcon : ArrowTrendingDownIcon} color={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Income") < getTotalAmount(inflowDataList) ? 'green.400' : 'red.400'} size={20} /> 
              <Text>{generateComment(getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Income"), getTotalAmount(inflowDataList))}</Text>
            </Text>
          </Box>
        </Box>
        <Box
          paddingX={2}
          paddingY={5}
          backgroundColor={'white'}
          borderRadius={10}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Icon
            as={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Expense") < getTotalAmount(outflowDataList) ? <ArrowUpIcon/> : <ArrowDownIcon/>}
            color={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Expense") < getTotalAmount(outflowDataList) ? 'green.400' : 'red.400'}
            size={24}
            borderRadius={'full'}
            backgroundColor={'gray.100'}
            padding={5}
          />
          <Text fontWeight={'bold'} fontSize={'xl'}>
            Outflow
          </Text>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text>{`${convertToVND(getTotalAmount(outflowDataList))}`}</Text>
            <Text>
              <Icon as={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Expense") < getTotalAmount(outflowDataList) ? ArrowTrendingUpIcon : ArrowTrendingDownIcon} color={getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Expense") < getTotalAmount(outflowDataList) ? 'green.400' : 'red.400'} size={20} /> 
              <Text>{generateComment(getAmountOfMonth(listActivity, getPreviousMonth(flowMonth), "Expense"), getTotalAmount(outflowDataList))}</Text>
            </Text>
          </Box>
        </Box>
        <View>
          {flow !== 'Inflow' ? (
            <Box padding={5} borderRadius={5} shadow={2} backgroundColor={'white'} marginTop={3}>
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text
                  fontWeight={'bold'}
                >{`${flow === 'Inflow' ? 'Outflow' : 'Inflow'} detail`}</Text>
                <Select
                  selectedValue={flowMonth}
                  minWidth='200'
                  accessibilityLabel='Choose Month'
                  placeholder='Choose Month'
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size='5' />
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setflowMonth(itemValue)}
                >
                  <Select.Item label='January' value='January' />
                  <Select.Item label='February' value='February' />
                  <Select.Item label='March' value='March' />
                  <Select.Item label='April' value='April' />
                  <Select.Item label='May' value='May' />
                  <Select.Item label='June' value='June' />
                  <Select.Item label='July' value='July' />
                  <Select.Item label='August' value='August' />
                  <Select.Item label='September' value='September' />
                  <Select.Item label='October' value='October' />
                  <Select.Item label='November' value='November' />
                  <Select.Item label='December' value='December' />
                </Select>
              </Box>
              <Button onPress={handleSetFlow} marginTop={2}>
                {`See ${flow}`}
              </Button>
              {inflowDataList.length > 0 ? (
                <PieChart
                  hasLegend={true}
                  data={inflowDataList}
                  width={Dimensions.get('window').width - 100}
                  height={200}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                      paddingRight: 50
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726'
                    }
                  }}
                  accessor={'amount'}
                  backgroundColor={'transparent'}
                  paddingLeft={'10'}
                />
              ) : (
                <Text
                  color={'red.400'}
                  fontWeight={'bold'}
                  marginTop={5}
                  justifyItems={'center'}
                >{`Not found income amount of this month!`}</Text>
              )}
            </Box>
          ) : (
            <Box padding={5} borderRadius={5} shadow={2} backgroundColor={'white'} marginTop={3}>
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text
                  fontWeight={'bold'}
                >{`${flow === 'Inflow' ? 'Outflow' : 'Inflow'} detail`}</Text>
                <Select
                  selectedValue={flowMonth}
                  minWidth='200'
                  accessibilityLabel='Choose Month'
                  placeholder='Choose Month'
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size='5' />
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setflowMonth(itemValue)}
                >
                  <Select.Item label='January' value='January' />
                  <Select.Item label='February' value='February' />
                  <Select.Item label='March' value='March' />
                  <Select.Item label='April' value='April' />
                  <Select.Item label='May' value='May' />
                  <Select.Item label='June' value='June' />
                  <Select.Item label='July' value='July' />
                  <Select.Item label='August' value='August' />
                  <Select.Item label='September' value='September' />
                  <Select.Item label='October' value='October' />
                  <Select.Item label='November' value='November' />
                  <Select.Item label='December' value='December' />
                </Select>
              </Box>
              <Button onPress={handleSetFlow} marginTop={2}>
                {`See ${flow}`}
              </Button>
              {outflowDataList.length > 0 ? (
                <PieChart
                  hasLegend={true}
                  data={outflowDataList}
                  width={Dimensions.get('window').width - 100}
                  height={200}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726'
                    }
                  }}
                  accessor={'amount'}
                  backgroundColor={'transparent'}
                  paddingLeft={'10'}
                />
              ) : (
                <Text
                  color={'red.400'}
                  fontWeight={'bold'}
                  marginTop={5}
                  justifyItems={'center'}
                >{`Not found expense amount of this month!`}</Text>
              )}
            </Box>
          )}
        </View>
      </View>
    </View>
  );
};

export default DetailChartScreen;
