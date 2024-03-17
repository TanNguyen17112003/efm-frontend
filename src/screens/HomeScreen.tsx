import { Text, Box, View, Icon, Image, Button, ScrollView } from "native-base"
import { BellIcon } from "react-native-heroicons/solid";

import tw from 'twrnc';
type Activity = {
  category: string;
  title: string;
  amount: number;
  type: string;
  date: Date;
}
export const HomeScreen = () => {
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
  const activityList = [
    {
      category: "Food and Drink",
      title: "Ăn tối tại landmark 81",
      amount: 980000,
      type: "expense",
      image: require('../assets/icon-food.png'),
      date: new Date(2024, 1, 15)
    },
    {
      category: "Shopping",
      title: "Mua hàng tại Shoppee",
      amount: 580000,
      type: "expense",
      image: require('../assets/icon-shopping.png'),
      date: new Date(2024, 1, 20)
    },
    {
      category: "Sport",
      title: "Tiền tập gym hàng tháng",
      amount: 200000,
      type: "expense",
      image: require('../assets/icon-sport.png'),
      date: new Date(2024, 2, 13)
    },
    {
      category: "Transport",
      title: "TIền đi chuyến xe",
      amount: 300000,
      type: "expense",
      image: require('../assets/icon-transport.png'),
      date: new Date(2024, 3, 12)
    },
    {
      category: "Salary",
      title: "Lãnh lương hàng tháng",
      amount: 15000000,
      type: "income",
      image: require('../assets/icon-credit.png'),
      date: new Date(2024, 3, 1)
    }
  ]
  const getTotalAmount = (activityList: Activity[]) => {
    const totalAmount = activityList.reduce((total, item) => {
      return item.type === "expense" ? total - item.amount : total + item.amount;
    }, 0);
    return totalAmount.toLocaleString('de-DE');
  }
  return (
    <Box>
      <Box backgroundColor="blue.700" padding={10}>
        <View style={tw`flex-row items-center justify-between`} marginBottom={5}>
            <Box>
                <Text color="white" bold>Hi, Minh Loc</Text>
                <Text color="gray.100" opacity={40}>{getExactTime()}</Text>
            </Box>
            <Icon as={<BellIcon size={30} />} color="white" />
        </View>
        <View style={tw`flex-row items-center justify-between`}>
          <Box>
            <Text color="white" bold opacity={40}>TOTAL AMOUNT</Text>
            <Text fontSize={'2xl'} color="white" bold>{`${getTotalAmount(activityList)} VNĐ`}</Text>
          </Box>
          <Button color="white" backgroundColor="gray.800" bgColor="blue.400">View detail</Button>
        </View>
      </Box>
      <ScrollView padding={3}>
        {activityList.map((item, index) => (
          <Box key={index} style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
            <View style={tw`flex-row items-center gap-3 justify-between mb-3`}>
              <Box style={tw`flex-row items-center gap-3`}>
                <Image source={item.image} alt="Category" style={tw`w-10 h-10`} />
                <View>
                  <Text bold>{item.title}</Text>
                  <Text opacity={50}>{item.category}</Text>
                </View>
              </Box>
              <Text bold>{`${item.amount.toLocaleString('de-DE')} VNĐ`}</Text>
            </View>
            <Text italic>{`${item.date.getDate()}/${item.date.getMonth()}/${item.date.getFullYear()}`}</Text>
          </Box>
        ))}
      </ScrollView>
    </Box>
  )
}

