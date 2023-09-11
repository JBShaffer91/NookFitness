import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type WaterIntakeProps = {
  // Add any props if needed
};

const WaterIntake: React.FC<WaterIntakeProps> = () => {
  const [waterIntake, setWaterIntake] = useState<number>(0); // Initial water intake is set to 0

  const handleHalfLiterClick = () => {
    setWaterIntake(prevIntake => prevIntake + 0.5);
  };

  const handleOneLiterClick = () => {
    setWaterIntake(prevIntake => prevIntake + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Intake for Today</Text>
      <Text style={styles.intakeValue}>{waterIntake} liters</Text>
      <View style={styles.buttonsContainer}>
        <Button title="0.5L Bottle" onPress={handleHalfLiterClick} />
        <Button title="1L Bottle" onPress={handleOneLiterClick} />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  intakeValue: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },
});

export default WaterIntake;
