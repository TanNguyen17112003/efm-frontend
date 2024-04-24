import { Box, Text, Icon, View, Heading, Input, Button, FormControl, Progress, ChevronLeftIcon, AlertDialog} from "native-base"
import tw from 'twrnc';
import { useState, useEffect, useRef} from 'react';
import {  Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { CalendarDaysIcon, ViewColumnsIcon, PencilIcon, WalletIcon  } from 'react-native-heroicons/solid';
import { useRoute } from "@react-navigation/native";
import { getJWT, mapCategory } from "@utils";
import { getGoalById, configGoalById, deleteGoalById } from "@services";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const UpdateGoalScreen = () => {
    const cancelRef = useRef(null);
    const route = useRoute();
    const goalInfo = route.params;
    const [token, setToken] = useState<string>('');
    const [goal, setGoal] = useState<Goal>();
    const [show, setShow] = useState<boolean>(false);
    const navigation = useNavigation();
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
    const [current, setCurrent] = useState<number>(0);
    const [target, setTarget] = useState<number>(0);
    const [modifiedDate, setModifiedDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // THis will put image to goal from category
    const modifyGoal = (input: Goal) => {
        const newGoal = {...input}
        newGoal.image = mapCategory(input.category)
        setGoal(newGoal);
    }
    // Actions related to current goal
    // Update goal
    const handleConfig = () => {
        const newUpdateGoal = configGoalById(token, goalInfo?.id, modifiedDate, target, current);
        navigation.navigate("Goal");
    }
    // Delete goal
    const handleDelete = () => {
      const message = deleteGoalById(token, goalInfo?.id);
      navigation.navigate("Goal");
    }
    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || modifiedDate;
        setModifiedDate(currentDate);
        setShow(false);
      };
    useEffect(() => {
        const getGoal = async () => {
          try {
            const data = await getJWT();
            if (data) {
              setToken(data.token);
              const result = await getGoalById(data.token, goalInfo?.id);
              modifyGoal(result);
            }
          } catch (e) {
            throw e;
          }
        };
        getGoal();
      }, [goalInfo?.id, token]);

    return (
        <Box backgroundColor={"white"}>
          <Box backgroundColor="blue.700" paddingTop={70} position="relative" borderBottomRadius={0}>
          <Box><ChevronLeftIcon style={tw`absolute left-5 top-5 text-white`} onPress={() => navigation.navigate("Goal")}/></Box>   
            <Heading color="white" textAlign="center" style={tw`mb-5`}>Update goal</Heading>
          </Box>
          {goal != null  &&  <Box style={tw`px-5 py-2`} backgroundColor='white' borderWidth="1" borderColor="coolGray.300" rounded={8}>
                    <View style={tw`flex-row items-center gap-3 mb-3`}>
                       <Image source={goal.image} style={tw`w-10 h-10`} />  
                        <View>
                            <Text bold fontSize='2xl'>{goal.title}</Text>
                            <Text opacity={50}>{`${formatter.format(new Date(goal.date))}, ${new Date(goal.date).getFullYear()}`}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row items-center gap-2`}>
                        <Text bold fontSize='2xl'>{`${goal.current / 1000000}M VNĐ`}</Text>
                        <Text>{`saved of ${goal.target / 1000000}M  VNĐ`}</Text>
                    </View>
                    <Progress w="300" shadow={2} value={goal.current / goal.target * 100} marginBottom={2}/>
               </Box>}
               <FormControl padding={5} style={tw`h-full`}>
               <FormControl.Label style={tw`flex-row items-center gap-2`}>
                  <Text fontSize={"2xl"} bold color="blue.700">Date</Text>
                  <Icon as={<CalendarDaysIcon size={16}/>} mr="3" color="blue.700"/>
                </FormControl.Label>
               {show && (
      <RNDateTimePicker
        testID="dateTimePicker"
        value={modifiedDate}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    )}
               <Input 
              value={modifiedDate.toLocaleDateString()} 
              onPressIn={() => setShow(true)}
              placeholder="Select a date"
            />
                <View style={tw`flex-row gap-3`}>
                <Box width={'50%'}>
                <FormControl.Label  style={tw`flex-row items-center gap-2`}>
                  <Text fontSize={"2xl"} bold color="blue.700">Current</Text>
                  <Icon as={<WalletIcon size={16}/>} mr="3" color="blue.700"/>
                </FormControl.Label>
                <Input
                    value={current.toString()}
                    placeholder= 'Enter update current money'
                    onChangeText={(value) => setCurrent(Number(value))}
                />
                </Box>
                <Box
                    width={'50%'}
                >
                <FormControl.Label  style={tw`flex-row items-center gap-2`}>
                  <Text fontSize={"2xl"} bold color="blue.700">Target</Text>
                  <Icon as={MaterialCommunityIcons} name='bullseye-arrow' size={5} color="blue.700"/>
                </FormControl.Label>
                <Input
                    value={target.toString()}
                    placeholder= 'Enter update target money'
                    onChangeText={(value) => setTarget(Number(value))}
                /> 
                </Box>
                
                </View>
            <Button.Group variant="solid" space={2}>
            <Button width={'50%'} borderRadius={5} marginTop={8} padding={5}  backgroundColor="blue.700" onPress={handleConfig}>Update</Button>    
            <Button width={'50%'} borderRadius={5} marginTop={8} padding={5}  backgroundColor="red.700" onPress={() => setIsOpen(true)}>Delete</Button>
            </Button.Group>
            </FormControl>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Goal</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove this goal from your list of goals. Do you really want to delete it?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={() => setIsOpen(false)} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handleDelete}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
            </AlertDialog>
        </Box>
      )
}