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
import UserRegistration from './src/screens/UserRegistration';
import TDEEScreen from './src/screens/TDEEScreen'; // Import the TDEE screen
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Import SafeAreaProvider

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
              name="TDEE"
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
            {/* Add other screens as needed */}
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
