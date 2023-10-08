import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type RootStackParamList = {
  UserRegistration: undefined;
  HomePage: { userId?: string; userEmail?: string; presentation?: string };
  TDEEScreen: { userId: string; userEmail: string; presentation: string; token: string | null };
  DietaryPreferencesAllergies: { userId: string; userEmail: string; presentation: string; token: string | null };
  WorkoutSettings: { userId: string; userEmail: string; presentation: string; token: string | null };
  FitnessGoalSelection: { userId: string; userEmail: string; presentation: string; token: string | null };
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

type UserData = {
  maintenanceCalories: number | null;
  caloricTarget: number | null;
  macronutrients: any | null;
  tdee: number | null;
};

const HomePage: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'HomePage'>>();
  
  const token = useSelector((state: RootState) => state.user.token); // <-- Updated line
  const caloricTargetFromStore = useSelector((state: RootState) => state.user.caloricTarget); // <-- Updated line

  const [userData, setUserData] = useState<UserData>({
    maintenanceCalories: null,
    caloricTarget: null,
    macronutrients: null,
    tdee: null
  });

  const userId = route.params?.userId;
  const userEmail = route.params?.userEmail;
  const presentation = route.params?.presentation;

  const fetchUserData = () => {
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
  };

  useEffect(() => {
    fetchUserData();
  }, [userEmail, token]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [userEmail, token])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nook Fitness Dashboard</Text>

      <View style={styles.card}>
        {userData.tdee && (!caloricTargetFromStore || caloricTargetFromStore === 0) && <Text>Maintenance Calories: {Math.ceil(userData.tdee)} kcal</Text>}
        {userData.tdee && caloricTargetFromStore && caloricTargetFromStore !== 0 && (
        <>
          <Text>Calorie Target: {Math.ceil(userData.tdee + caloricTargetFromStore)} kcal</Text>
          <Text>Total Available Calories for the Day: {Math.ceil(userData.tdee + caloricTargetFromStore)} kcal</Text>
        </>
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
        onPress={() => userId && userEmail && presentation && navigation.navigate('TDEEScreen', { userId, userEmail, presentation, token })} 
        disabled={!userId || !userEmail || !presentation}
      />
      <Button 
        title="Update Fitness Goals" 
        onPress={() => userId && userEmail && presentation && navigation.navigate('FitnessGoalSelection', { userId, userEmail, presentation, token })} 
        disabled={!userId || !userEmail || !presentation}
      />
      <Button 
        title="Update Dietary Preferences" 
        onPress={() => userId && userEmail && presentation && navigation.navigate('DietaryPreferencesAllergies', { userId, userEmail, presentation, token })} 
        disabled={!userId || !userEmail || !presentation}
      />
      <Button 
        title="Update Workout Settings" 
        onPress={() => userId && userEmail && presentation && navigation.navigate('WorkoutSettings', { userId, userEmail, presentation, token })} 
        disabled={!userId || !userEmail || !presentation}
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
