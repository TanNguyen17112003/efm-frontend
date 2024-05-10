import { Text, Box, View, Icon, Image, Button, ScrollView, Circle } from "native-base";
import {
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { BellIcon } from "react-native-heroicons/solid";
import { getJWT } from "@utils";
import tw from 'twrnc';
import { useState, useEffect } from "react";
import { mapCategory } from "@utils";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { getAllActivities } from "src/store/reducers/activities";
import { RootState } from 'src/store';
import { useNavigation } from "@react-navigation/native";


let totalData: number[][] = []

export const HomeScreen = () => {
  const [monthlyTotals, setMonthlyTotals] = useState(Array.from({length: 12}, () => ({ income: 0, expense: 0 })));
  const [userName, setUserName] = useState<string>('');
  const [listActivities, setListActivities] = useState<Activity[]>([]);
  const dispatch = useAppDispatch();
  const { activities, loading, error } = useAppSelector((state: RootState) => state.activity);
  const navigator = useNavigation();
  const modifyListActivity = (activityList: Activity[]) => {
    const newActivityList =  activityList.map(item => {
      return {
        ...item,
        image: mapCategory(item.category)
      }
    })
    setListActivities(newActivityList);
  }

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);
  useEffect(() => {
    if (activities && activities.length > 0) modifyListActivity(activities);
  }, [activities]);
  // useEffect(() => {
  //   modifyListActivity(data);
  // }, [])
  
  useFocusEffect(
  React.useCallback(() => {
    const calculateMonthlyTotals = (activities: Activity[]) => {
      const totals = Array.from({length: 12}, () => ({ income: 0, expense: 0 }));
    
      activities.forEach(activity => {
        const month = new Date(activity.createdAt).getMonth();
    
        if (activity.type == 'Income') {
          totals[month].income += activity.amount;
        } else if (activity.type == 'Expense') {
          totals[month].expense += activity.amount;
        }
      });

      if (activities.length > 0) { 
        totalData =  totals.map(total => [total.income, total.expense])
      }
    
      setMonthlyTotals(totals); // update the state with the new totals
    };

    calculateMonthlyTotals(listActivities);
    return () => {}; // optional cleanup function
  }, [listActivities])
);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const totals = calculateMonthlyTotals(listActivities);
  //     setMonthlyTotals(totals);
  //     console.log(monthlyTotals);
  //     return () => {}
  //   }, [listActivities])
  // );

  const getExactTime = () => {
    var today = new Date();
    var time = today.getHours();
    if (time < 12) {
      return "Good Morning!"
    } else if (time < 18) {
      return "Good Afternoon!"
    } else {
      return "Good Evening!"
    }
  }

  const getTotalAmount = (activityList: Activity[]) => {
    const totalAmount = activityList.reduce((total, item) => {
      return item.type === "Expense" ? total - item.amount : total + item.amount;
    }, 0);
    return totalAmount.toLocaleString('de-DE');
  }

  return (
    <Box>
      <Box backgroundColor="blue.700" padding={10}>
        <View style={tw`flex-row items-center justify-between`} marginBottom={5}>
            <Box>
                <Text color="white" bold>{userName}</Text>
                <Text color="gray.100" opacity={40}>{getExactTime()}</Text>
            </Box>
            <Icon as={<BellIcon size={30} />} color="white" />
        </View>
        <View style={tw`flex-row items-center justify-between`}>
          <Box>
            <Text color="white" bold opacity={40}>TOTAL AMOUNT</Text>
            <Text fontSize={'2xl'} color="white" bold>{`${getTotalAmount(listActivities)} VNĐ`}</Text>
          </Box>
          <Button color="white" backgroundColor="gray.800" bgColor="blue.400" onPress={() => navigator.navigate('DetailChart')}>View detail</Button>
        </View>
      </Box>

      <StackedBarChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
          legend: ['Income', 'Expense'],
          data: totalData,
          barColors: ['#3498db', '#e74c3c'],
        }}
        hideLegend={true}
        withHorizontalLabels={true}
        width={Dimensions.get('window').width + 60}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginLeft: -70,
          marginRight: 8,
        }}
      />

      <Box
        display={'flex'}
        flexDir={'row'}
        mx={'auto'}
        w={'100%'}
        justifyContent={'space-evenly'}
        bg={'#eff3ff'}
        mb={5}
        mt={-5}
        py={3}
      >
        <Box display={'flex'} flexDir={'row'} alignItems={'center'}>
          <Circle backgroundColor={'#3498db'} width={2} height={2} />
          <Text ml={2} bold>Income</Text>
        </Box>
        <Box display={'flex'} flexDir={'row'} alignItems={'center'}>
          <Circle backgroundColor={'#e74c3c'} width={2} height={2} />
          <Text ml={2} bold>Expense</Text>
        </Box>
      </Box>

      <ScrollView h={600} paddingX={5}>
        {listActivities.map((item, index) => (
          <Box key={index} style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
            <View style={tw`flex-row items-center gap-3 justify-between mb-3`}>
              <Box style={tw`flex-row items-center gap-3`}>
                <Image source={item?.image} alt="Category" style={tw`w-10 h-10`} />
                <View>
                  <Text bold>{item.content}</Text>
                  <Text opacity={50}>{item.category}</Text>
                </View>
              </Box>
              <Text bold>{`${item.amount.toLocaleString('de-DE')} VNĐ`}</Text>
            </View>
            <Text italic>{`${new Date(item.createdAt).getDate()}/${new Date(item.createdAt).getMonth() + 1}/${new Date(item.createdAt).getFullYear()}`}</Text>
          </Box>
        ))}
      </ScrollView>
    </Box>
  )
}