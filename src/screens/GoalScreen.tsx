import { Box, Text, FlatList, View,  Icon, Progress, Image, ScrollView, ThreeDotsIcon } from "native-base"
import { PlusCircleIcon } from "react-native-heroicons/solid";
import { getAllGoals } from "@services";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getJWT } from "@utils";
import tw from 'twrnc';
export const GoalScreen = () => {
  const navigation = useNavigation();
  const [goalList, setGoalList] = useState([]);
  // useEffect(() => {
  //   const fetchGoals = async () => {
  //     try {
  //       const token = getJWT();
  //       const response = await getAllGoals(token);
  //       console.log(response)
  //       setGoalList(response);
  //     }
  //     catch (e) {
  //       throw e
  //     }
  //   }
  //   fetchGoals();
  // }
  // , [])
  
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
  const getDiffDate = (date: Date) => {
    const currentDate = new Date();
    const diff = date.getTime() - currentDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  }
  return (
    <Box flex={1}>
      <Box backgroundColor="blue.700" style={tw`p-5`}>
            <Text bold fontSize='2xl' color="white">Goals</Text>
            <Text color="white" opacity="60">Don't forget about your goals because they are the spirit that make you stay life</Text>
            <Box style={tw`flex-row justify-center items-center gap-3 p-2 mt-3`} backgroundColor="white">
                {/* <Icon as={<PlusCircleIcon size={50} />} color="blue.500" onPress={() => navigation.navigate("Success")}/> */}
                <Text bold>Add your goals</Text>
            </Box>
      </Box>
      <ScrollView>
        <Text>{goalList.length}</Text>
      {/* {goalList.map((item, index) => (
         <Box style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
         <View style={tw`flex-row items-center justify-between mb-3`}>
           <Box style={tw`flex-row items-center gap-3`}>
               <Image source={item.category} alt="Category" style={tw`w-10 h-10`} />
               <View>
                   <Text bold>{item.title}</Text>
                   <Text opacity={50}>{`${formatter.format(item.dueDate)}, ${item.dueDate.getFullYear()}`}</Text>
               </View>
           </Box>
             
             <ThreeDotsIcon color="gray.500"/>
         </View>
         <View style={tw`flex-row items-center justify-between mb-3`}>
           <Box style={tw`flex-row items-center gap-3`}>
             <Text bold fontSize='2xl'>{`${item.currentMoney / 1000000}M VNĐ`}</Text>
             <Text>{`saved of ${item.totalMoney / 1000000}M VNĐ`}</Text>
           </Box>
             <Text italic>{`${getDiffDate(item.dueDate)} days left`}</Text>
         </View>
         <Progress w="300" shadow={2} value={item.currentMoney / item.totalMoney * 100} style={tw`mb-3`}/>
    </Box>
      ) )} */}
      </ScrollView>
    </Box>
  )
}

