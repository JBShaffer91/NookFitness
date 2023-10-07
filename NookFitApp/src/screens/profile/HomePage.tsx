import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BACKEND_URL } from '@env';
import { useSelector } from 'react-redux';
import { selectToken } from '../../selectors/userSelector';

type RootStackParamList = {
  UserRegistration: undefined;
  HomePage: { userId?: string; userEmail?: string; presentation?: string };
  TDEEScreen: { userId: string; userEmail: string | null; presentation: string | null };
  DietaryPreferencesAllergies: { userId: string };
  WorkoutSettings: { userId: string };
  FitnessGoalSelection: { userId: string };
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HomePage: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'HomePage'>>();
  const token = useSelector(selectToken);

  const [userData, setUserData] = useState({
    maintenanceCalories: null,
    caloricTarget: null,
    macronutrients: null
  });

  const userId = route.params?.userId;
  const userEmail = route.params?.userEmail;
  const presentation = route.params?.presentation;

  useEffect(() => {
    if (userEmail && token) {
      fetch(`${BACKEND_URL}/api/users/profile/${encodeURIComponent(userEmail)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.error && data.error === "Invalid Token") {
          navigation.navigate('UserRegistration');
          console.error("Token has expired. Redirecting to login.");
        } else {
          setUserData(data);
        }
      })      
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userEmail, token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nook Fitness Dashboard</Text>

      <View style={styles.card}>
        {userData.maintenanceCalories && <Text>Maintenance Calories: {userData.maintenanceCalories} kcal</Text>}
        {userData.caloricTarget && <Text>Caloric Adjustment: {userData.caloricTarget} kcal</Text>}
        {userData.maintenanceCalories && userData.caloricTarget && (
          <Text>Total Available Calories for the Day: {userData.maintenanceCalories + userData.caloricTarget} kcal</Text>
        )}
        {userData.macronutrients && <Text>Macronutrients: {JSON.stringify(userData.macronutrients)}</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 Today's To-Do List</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💧 Water Intake</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍽️ Food Diary</Text>
      </View>

      <Button 
        title="Update TDEE Information" 
        onPress={() => userId && userEmail && presentation && navigation.navigate('TDEEScreen', { userId, userEmail, presentation })} 
        disabled={!userId || !userEmail || !presentation}
      />
      <Button 
        title="Update Fitness Goals" 
        onPress={() => userId && navigation.navigate('FitnessGoalSelection', { userId })} 
        disabled={!userId}
      />
      <Button 
        title="Update Dietary Preferences" 
        onPress={() => userId && userEmail && navigation.navigate('DietaryPreferencesAllergies', { userId })} 
        disabled={!userId || !userEmail}
      />
      <Button 
        title="Update Workout Settings" 
        onPress={() => userId && userEmail && navigation.navigate('WorkoutSettings', { userId })} 
        disabled={!userId || !userEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomePage;
