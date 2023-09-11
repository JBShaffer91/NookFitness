import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserRegistration from './src/screens/registration/UserRegistration';
import TDEEScreen from './src/screens/registration/TDEEScreen';
import FitnessGoalSelection from './src/screens/registration/FitnessGoalSelection';
import WorkoutSettings from './src/screens/registration/WorkoutSettings';
import DietaryPreferencesAllergies from './src/screens/registration/DietaryPreferencesAllergies';
import HealthConcernsInjuries from './src/screens/registration/HealthConcernsInjuries';
import HomePage from './src/screens/profile/HomePage'; // Importing HomePage
import FoodDiary from './src/screens/profile/FoodDiary'; // Importing FoodDiary
import ToDoList from './src/screens/profile/ToDoList'; // Importing ToDoList
import WaterIntake from './src/screens/profile/WaterIntake'; // Importing WaterIntake
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Create a stack navigator
const Stack = createStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: backgroundStyle.backgroundColor }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="UserRegistration">
            <Stack.Screen
              name="UserRegistration"
              component={UserRegistration}
              options={{
                title: 'NookFitApp',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="TDEEScreen"
              component={TDEEScreen}
              options={{
                title: 'TDEE Information',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="FitnessGoalSelection"
              component={FitnessGoalSelection}
              options={{
                title: 'Select Fitness Goals',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="WorkoutSettings"
              component={WorkoutSettings}
              options={{
                title: 'Workout Settings',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="DietaryPreferencesAllergies"
              component={DietaryPreferencesAllergies}
              options={{
                title: 'Dietary Preferences & Allergies',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="HealthConcernsInjuries"
              component={HealthConcernsInjuries}
              options={{
                title: 'Health Concerns & Injuries',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            {/* Adding new screens */}
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                title: 'Profile Home',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="FoodDiary"
              component={FoodDiary}
              options={{
                title: 'Food Diary',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="ToDoList"
              component={ToDoList}
              options={{
                title: 'To-Do List',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
            <Stack.Screen
              name="WaterIntake"
              component={WaterIntake}
              options={{
                title: 'Water Intake',
                headerStyle: {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
                headerTitleStyle: styles.title,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
