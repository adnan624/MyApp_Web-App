import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://', 'http://localhost:3000'],
  config: {
    screens: {
      Home: '',
      Form: 'form',
      Settings: 'settings',
    },
  },
};

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: '#0f172a' },
  headerTintColor: '#f1f5f9',
  headerTitleStyle: { fontWeight: '700', fontSize: 18 },
  animation: Platform.OS === 'web' ? 'none' : 'slide_from_right',
  contentStyle: { backgroundColor: '#f8fafc' },
};

const AppNavigator: React.FC = () => {
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
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'MyApp — Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
