import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../reducers/userReducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { registerUser } from '../../api/userAPI';

type RootStackParamList = {
  UserRegistration: undefined;
  HomePage: undefined;
};

type UserRegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserRegistration'
>;

type Props = {
  navigation: UserRegistrationScreenNavigationProp;
};

type UserData = {
  username: string;
  email: string;
  password: string;
  presentation: string;
};

const signInUser = async (data: UserData) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Error signing in user.');
  }
};

const UserRegistration: React.FC<Props> = ({ navigation }) => {
  const [isSignIn, setIsSignIn] = useState(false); // Toggle between Sign In and Registration
  const [formData, setFormData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
    presentation: '',
  });

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const signInResponse = await signInUser(formData);
      if (signInResponse.success) {
        dispatch(setUserProfile(formData));
        navigation.navigate('HomePage');
      } else {
        Alert.alert('Sign In Message', signInResponse.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to sign in. Please check your connection and try again.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(formData);
      
      if (response.message) {
        if (response.message === 'User already exists.') {
          const signInResponse = await signInUser(formData);
          if (signInResponse.success) {
            dispatch(setUserProfile(formData));
            navigation.navigate('HomePage');
          } else {
            Alert.alert('Sign In Message', signInResponse.message);
          }
        } else {
          Alert.alert('Registration Message', response.message);
        }
      } else {
        dispatch(setUserProfile(formData));
        navigation.navigate('HomePage');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to process. Please check your connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      {isSignIn ? (
        <>
          <Text style={styles.title}>Welcome back to Nook Fitness! Sign In to continue.</Text>
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
          <Button title="Sign In" onPress={handleSignIn} />
          <Text style={{ textAlign: 'center', marginTop: 10 }} onPress={() => setIsSignIn(false)}>New here? Register</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Welcome to Nook Fitness! Let's create your profile!</Text>
          <TextInput
            placeholder="Name"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
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
          <Text style={{ textAlign: 'center', marginTop: 10 }} onPress={() => setIsSignIn(true)}>Already a user? Sign In</Text>
        </>
      )}
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
