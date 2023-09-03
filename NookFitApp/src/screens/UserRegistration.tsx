import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../reducers/userReducer';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the navigation prop and the navigator's route names
type RootStackParamList = {
  UserRegistration: undefined;
  TDEE: undefined; // Add other screen names as needed
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
    firstName: '',
    lastName: '',
    password: '',
    gender: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setUserProfile(formData));
    navigation.navigate('TDEE'); // Navigate to the TDEE screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nook Fitness! Let's create your profile!</Text>

      <TextInput
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry={true}
        style={styles.input}
      />

      <Picker
        selectedValue={formData.gender}
        onValueChange={(itemValue: string) =>
          setFormData({ ...formData, gender: itemValue })
        }>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10
  }
});

export default UserRegistration;
