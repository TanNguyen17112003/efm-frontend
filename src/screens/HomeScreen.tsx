import { Text, Box, View, Icon, Image, Button, ScrollView } from "native-base";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { BellIcon } from "react-native-heroicons/solid";
import { getJWT } from "@utils";
import { getAllActivities } from "@services";
import tw from 'twrnc';
import { useState, useEffect } from "react";
import { mapCategory } from "@utils";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
type Activity = {
  category: string;
  content: string;
  amount: number;
  type: string;
  createdAt: Date;
  image: any;
}
export const HomeScreen = () => {
  const [monthlyTotals, setMonthlyTotals] = useState(Array.from({length: 12}, () => ({ income: 0, expense: 0 })));
  const [userName, setUserName] = useState<string>('');
  const [listActivities, setListActivities] = useState<Activity[]>([]);
  const modifyListActivity = (activityList: Activity[]) => {
    const newActivityList =  activityList.map(item => {
      return {
        ...item,
        image: mapCategory(item.category)
      }
    })
    setListActivities(newActivityList);
  }
  
  useFocusEffect(
  React.useCallback(() => {
    const getUserData = async () => {
      const data = await getJWT();
      if (data) {
        setUserName(data.name);
      }
    }
    const getActivities = async () => {
      const data = await getJWT();
      if (data) {
        const response = await getAllActivities(data.token);
        modifyListActivity(response);
      }
    }
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
    
      setMonthlyTotals(totals); // update the state with the new totals
    };
    getUserData();
    getActivities();
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
 <StackedBarChart
  data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    legend: ['Income', 'Expense'],
    data: monthlyTotals.map(total => [total.income, total.expense]),
    barColors: ['#3498db', '#e74c3c'],
  }}
  width={Dimensions.get('window').width}
  height={220}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
    marginRight: 8,
  }}
/>
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
          <Button color="white" backgroundColor="gray.800" bgColor="blue.400">View detail</Button>
        </View>
      </Box>
      <ScrollView h={300}>
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

