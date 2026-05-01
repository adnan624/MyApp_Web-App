import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://', 'http://localhost:3000'],
  config: {
    screens: {
      Home: '',
      Form: 'form',
    },
  },
};

const screenOptions = {
  headerStyle: { backgroundColor: '#0f172a' },
  headerTintColor: '#f1f5f9',
  headerTitleStyle: { fontWeight: '700', fontSize: 18 },
  animation: Platform.OS === 'web' ? 'none' : 'slide_from_right',
  contentStyle: { backgroundColor: '#f8fafc' },
};

export default function AppNavigator() {
  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      )}
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'MyApp — Home' }}
          />
          <Stack.Screen
            name="Form"
            component={FormScreen}
            options={{ title: 'MyApp — Form Demo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
