import { Alert } from 'react-native';

export default function showPlatformAlert(title, message) {
  Alert.alert(title, message, [{ text: 'OK' }]);
}
