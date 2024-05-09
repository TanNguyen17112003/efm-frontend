import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddChallengeScreen, DetailChallengeScreen, ShareScreen, AddGoalScreen, SuccessScreen, SignupScreen, WelcomeScreen, SplashScreen, OnboardingScreen, LoginScreen, HomeScreen, MenuScreen, GoalScreen, ChallengeScreen, AddActivityScreen, UpdateGoalScreen, FriendScreen } from "@screens";
import { Drawer } from "@components";
import AboutScreen from "src/screens/AboutScreen";
import ChangePasswordScreen from "src/screens/ChangePasswordScreen";

interface StackNavigatorParams {
  Splash: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  DrawerStack: undefined;
  Signup: undefined;
  Success: Success;
  UpdateGoal: { id: string }; // Add the id parameter here
  [key: string]: undefined | Success | { id: string }; // Add the id parameter here
}

const Stack = createNativeStackNavigator<StackNavigatorParams>();
const DrawerStack = createNativeStackNavigator();

const DrawerStackScreen = () => (
  <>
  <DrawerStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <DrawerStack.Screen name="Home" component={HomeScreen} />
    <DrawerStack.Screen name="Menu" component={MenuScreen} />
    <DrawerStack.Screen name="Challenge" component={ChallengeScreen} />
    <DrawerStack.Screen name="Goal" component={GoalScreen} />
    <DrawerStack.Screen name="AddActivity" component={AddActivityScreen} />
    <DrawerStack.Screen name="UpdateGoal" component={UpdateGoalScreen} /> 
  </DrawerStack.Navigator>
  <Drawer />
  </>
);

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="{Splash}" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="Friend" component={FriendScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerStack" component={DrawerStackScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="AddGoal" component={AddGoalScreen} />
        <Stack.Screen name="UpdateGoal" component={UpdateGoalScreen} initialParams={{ id: '333' }} /> 
        <Stack.Screen name="AddChallenge" component={AddChallengeScreen} />
        <Stack.Screen name="DetailChallenge" component={DetailChallengeScreen} />
        <Stack.Screen name="Share" component={ShareScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};