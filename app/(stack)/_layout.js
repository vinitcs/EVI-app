import { View, Text } from 'react-native'
import React from 'react';
import { Stack } from 'expo-router';


const StackLayout = () => {
  return (
    <Stack
      // screenOptions={{
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //   },
      // }}
      >
      <Stack.Screen name="apply" />
    </Stack>

  )
}

export default StackLayout