import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SuccessScreen, SignupScreen, WelcomeScreen, SplashScreen, OnboardingScreen, LoginScreen, HomeScreen, MenuScreen, GoalScreen, ChallengeScreen, AddActivityScreen } from "@screens";
import { Drawer } from "@components";

interface StackNavigatorParams {
  Splash: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  DrawerStack: undefined;
  Signup: undefined;
  Success: Success;
  [key: string]: undefined | Success;
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
  </DrawerStack.Navigator>
  <Drawer />
  </>
);

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerStack" component={DrawerStackScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};