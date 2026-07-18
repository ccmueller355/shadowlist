// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ListDetailScreen } from '../screens/ListDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  ListDetail: { listId: string; listName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListDetail" component={ListDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
