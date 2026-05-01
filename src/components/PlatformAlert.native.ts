// Native: OS-level modal dialog on iOS and Android
import { Alert } from 'react-native';

const showPlatformAlert = (title: string, message: string): void => {
  Alert.alert(title, message, [{ text: 'OK' }]);
};

export default showPlatformAlert;
