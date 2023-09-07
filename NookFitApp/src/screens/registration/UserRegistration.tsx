import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../reducers/userReducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { BACKEND_URL } from '@env';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
};

type UserRegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserRegistration'
>;

type Props = {
  navigation: UserRegistrationScreenNavigationProp;
};

const UserRegistration: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    presentation: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      // Send the user registration data to the backend
      const response = await fetch(`${BACKEND_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUserProfile(formData));
        navigation.navigate('TDEEScreen');
      } else {
        Alert.alert('Registration Error', data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Unable to register. Please check your connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nook Fitness! Let's create your profile!</Text>

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

      <Text style={styles.subTitle}>How do you present?</Text>
      <Picker
        selectedValue={formData.presentation}
        onValueChange={(itemValue: string) =>
          setFormData({ ...formData, presentation: itemValue })
        }>
        <Picker.Item label="Masculine" value="masculine" />
        <Picker.Item label="Feminine" value="feminine" />
        <Picker.Item label="Non-Binary" value="non-binary" />
      </Picker>

      <Button title="Next" onPress={handleSubmit} />
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
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
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
