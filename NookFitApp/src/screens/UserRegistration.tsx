// UserRegistration.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    weightLossGoal: '',
    dietPreference: '',
    allergies: [],
    fitnessExperience: '',
    workoutPreference: '',
    healthConcerns: ''
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    // e.g., API call to register the user
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>

      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry={true}
        style={styles.input}
      />

      {/* ... Add other input fields similarly ... */}

      <Picker
        selectedValue={formData.gender}
        onValueChange={(itemValue: string) =>
          setFormData({ ...formData, gender: itemValue })
        }>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        {/* ... Add other options as needed ... */}
      </Picker>

      {/* ... Add other pickers for activity level, diet preference, etc. ... */}

      <Button title="Register" onPress={handleSubmit} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10
  }
});

export default UserRegistration;
