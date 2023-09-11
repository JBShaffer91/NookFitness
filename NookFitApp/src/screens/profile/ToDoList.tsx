import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type ToDoListProps = {
  // Add any props if needed
};

const ToDoList: React.FC<ToDoListProps> = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    // Check if the user has completed the registration
    // This can be done by checking a value in your app's state or local storage
    // For now, we'll use a dummy value
    const userCompletedRegistration = true; // This should be replaced with actual logic

    setIsRegistered(userCompletedRegistration);

    if (userCompletedRegistration) {
      // Fetch daily workouts from ExerciseAPI3
      // For now, we'll use dummy data
      const dummyWorkouts = [
        { id: 1, name: 'Push-ups', reps: '3 sets of 10' },
        // ... add more dummy workouts
      ];
      setWorkouts(dummyWorkouts);
    }
  }, []);

  return (
    <View style={styles.container}>
      {!isRegistered ? (
        <View>
          <Text>Please complete the registration screens to view your daily workouts.</Text>
          {/* Add a button to navigate to the registration screen if needed */}
          <Button title="Go to Registration" onPress={() => { /* Navigate to registration */ }} />
        </View>
      ) : (
        <View>
          <Text>Daily Workouts:</Text>
          {workouts.map(workout => (
            <View key={workout.id}>
              <Text>{workout.name}: {workout.reps}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ToDoList;
