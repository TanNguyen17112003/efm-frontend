import { Box, Text, FlatList, View,  Icon, Progress, Image, ScrollView, ThreeDotsIcon } from "native-base"
import { TouchableOpacity } from "react-native";
import { PlusCircleIcon } from "react-native-heroicons/solid";
import { getAllGoals } from "@services";
import {  useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { getJWT, mapCategory } from "@utils";
import { Plus } from "@components";
import tw from 'twrnc';

export const GoalScreen = () => {
  const navigation = useNavigation();
  const [goalList, setGoalList] = useState<Goal[]>([]);
  const modifyGoalList = (goalList: Goal[]) => {
    const newGoalList = goalList.map(item => {
      return {
        ...item,
        image: mapCategory(item.category)
      }
    })
    setGoalList(newGoalList);
  }
    useFocusEffect(
      useCallback(() => {
        const fetchGoalList = async () => {
          try {
            const data = await getJWT();
            if (data) {
              const result = await getAllGoals(data.token);
              modifyGoalList(result)
          }
          }
          catch(e) {
            throw e
          }
        }
        fetchGoalList();
      },[goalList])
    )
  
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
                <Plus address="AddGoal"/>
                <Text bold>Add your goals</Text>
            </Box>
      </Box>
      <ScrollView>
      {goalList.length == 0 && <Box style={tw`flex-row items-center justify-center h-100`}>
        <Text fontSize={28} color={'red.700'} bold>You do not have any goals yet.</Text>
        </Box>}
      {goalList.length > 0 && goalList.map((item, index) => (
         <TouchableOpacity onPress={() => navigation.navigate('UpdateGoal', {id: item._id})} >
         <Box key={index} style={tw`p-5 mb-5`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
         <View style={tw`flex-row items-center justify-between mb-3`}>
           <Box style={tw`flex-row items-center gap-3`}>
               <Image source={item.image} alt="Category" style={tw`w-10 h-10`} />
               <View>
                   <Text bold>{item.title}</Text>
                   <Text opacity={50}>{`${formatter.format(new Date(item.date))}, ${new Date(item.date).getFullYear()}`}</Text>
               </View>
           </Box>
             
             <ThreeDotsIcon color="gray.500"/>
         </View>
         <View style={tw`flex-row items-center justify-between`}>
           <Box style={tw`flex-row items-center gap-3`}>
             <Text bold fontSize='2xl'>{`${item.current / 1000000}M VNĐ`}</Text>
             <Text>{`saved of ${item.target / 1000000}M VNĐ`}</Text>
           </Box>
         </View>
         <Text marginBottom={3} italic>{`${getDiffDate(new Date(item.date))} days left`}</Text>
         <Progress w="300" shadow={2} value={item.current / item.target * 100} style={tw`mb-3`}/>
         </Box>
    </TouchableOpacity>
      ) )}
      </ScrollView>
    </Box>
  )
}

