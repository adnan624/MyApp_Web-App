// Web: browser's native dialog
// react-native-web's Alert.alert is a no-op so we use window.alert
const showPlatformAlert = (title: string, message: string): void => {
  window.alert(`${title}\n\n${message}`);
};

export default showPlatformAlert;
