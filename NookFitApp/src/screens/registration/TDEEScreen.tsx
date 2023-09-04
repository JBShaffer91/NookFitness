import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
};

type TDEENavigationProp = StackNavigationProp<RootStackParamList, 'TDEEScreen'>;

const TDEEScreen = ({ navigation }: { navigation: TDEENavigationProp }) => {
  const [formData, setFormData] = useState({
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    activityLevel: '',
  });

  const handleSubmit = () => {
    navigation.navigate('FitnessGoalSelection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TDEE Information</Text>
      <Text style={styles.description}>
        TDEE (Total Daily Energy Expenditure) represents the total number of calories you burn in a day. It's essential for understanding how much food you should eat to maintain, lose, or gain weight.
      </Text>

      <TextInput
        placeholder="Age"
        value={formData.age}
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Height (feet)"
        value={formData.heightFeet}
        onChangeText={(text) => setFormData({ ...formData, heightFeet: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Height (inches)"
        value={formData.heightInches}
        onChangeText={(text) => setFormData({ ...formData, heightInches: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Weight (in lbs)"
        value={formData.weight}
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.subTitle}>Activity Level:</Text>
      <Picker
        selectedValue={formData.activityLevel}
        onValueChange={(itemValue: string) =>
          setFormData({ ...formData, activityLevel: itemValue })
        }>
        <Picker.Item label="Sedentary (little to no exercise)" value="sedentary" />
        <Picker.Item label="Light Activity (light exercise/sports 1-3 days/week)" value="light" />
        <Picker.Item label="Moderate Activity (moderate exercise/sports 3-5 days/week)" value="moderate" />
        <Picker.Item label="Intense Activity (hard exercise/sports 6-7 days a week)" value="intense" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default TDEEScreen;
