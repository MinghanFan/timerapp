// Import required modules from expo-notifications and react-native
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { getThemeColors } from './style.js';

// Function to initialize notifications and request permissions for Android
export const initializeAndroidNotifications = async () => {
  try {
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
  } catch (error) {
    console.error('Error initializing Android notifications:', error);
    return false;
  }
};

// Function to send a simple notification on Android
export const sendAndroidNotification = async (message, themeIndex) => {
  try {
    const colors = getThemeColors(themeIndex) || { text: '#000' }; // Use fallback value directly

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: message,
        color: colors.text,
        icon: './assets/icon2.png', // Ensure this path is valid
        sound: true, // Default sound on Android
        priority: Notifications.AndroidNotificationPriority.HIGH, // High priority to reduce delays
      },
      trigger: null, // Immediate delivery
    });
  } catch (error) {
    console.error('Error scheduling Android notification:', error);
  }
};

// Function to send a noisy notification on Android with a custom sound
export const sendAndroidNotificationNoisy = async (message, themeIndex) => {
  try {
    const colors = getThemeColors(themeIndex) || { text: '#000' }; // Use fallback value directly

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Noisy Reminder',
        body: message,
        color: colors.text,
        icon: './assets/icon2.png', // Ensure this path is valid
        sound: 'harp_lightcurve', // Custom sound
        priority: Notifications.AndroidNotificationPriority.HIGH, // High priority to reduce delays
      },
      trigger: null, // Immediate delivery
    });
  } catch (error) {
    console.error('Error scheduling noisy Android notification:', error);
  }
};
