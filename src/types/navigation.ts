import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define all screens and their params here
export type RootStackParamList = {
  Home: undefined;
  Form: undefined;
};

// Per-screen prop types
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type FormScreenProps = NativeStackScreenProps<RootStackParamList, 'Form'>;
