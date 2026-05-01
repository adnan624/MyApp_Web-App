import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define all screens and their params here
export type RootStackParamList = {
  Home: undefined;
  Form: undefined;
  Settings: undefined;
  Explore: undefined;
  Profile: undefined;
  About: undefined;
};

// Per-screen prop types
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type FormScreenProps = NativeStackScreenProps<RootStackParamList, 'Form'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export type ExploreScreenProps = NativeStackScreenProps<RootStackParamList, 'Explore'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export type AboutScreenProps = NativeStackScreenProps<RootStackParamList, 'About'>;
