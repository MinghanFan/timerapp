// Import required modules from expo-notifications and react-native
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

// Function to initialize notifications and request permissions for Android
export const initializeAndroidNotifications = async () => {
  // Request notification permissions using expo-notifications
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission for notifications not granted!');
    return false;
  }

  // Set the notification handling behavior (e.g., show notifications immediately)
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return true;
};

// Function to send a simple notification on Android
export const sendAndroidNotification = async (message) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: message,
        sound: true, // Default sound on Android
        priority: Notifications.AndroidNotificationPriority.HIGH, // High priority to reduce delays
      },
      trigger: null, // Immediate delivery
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

//Function to send a noisy notification on Android with a custom sound
export const sendAndroidNotificationNoisy = async (message) => {
  try {
    // Schedule a notification with a custom sound
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Noisy Reminder',
        body: message,
        sound: 'harp_lightcurve',
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // Immediate delivery
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};
