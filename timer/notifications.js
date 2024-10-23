import { Platform } from 'react-native'; // Import Platform to detect the environment

// Import web-specific notifications
import { sendWebNotification, sendWebNotificationNoisy, initializeWebNotifications } from './webNotifications';

// Import iOS-specific notifications
import { sendIOSNotification, sendIOSNotificationNoisy, initializeIOSNotifications } from './iosNotifications';

// Function to initialize notifications based on platform
export const initializeNotifications = async () => {
  if (Platform.OS === 'web') {
    // Initialize web notifications
    return await initializeWebNotifications();
  } else if (Platform.OS === 'ios') {
    // Initialize iOS notifications
    return await initializeIOSNotifications();
  }
};

// Function to send a notification based on platform
export const sendNotification = (message) => {
  if (Platform.OS === 'web') {
    // Send web notification
    sendWebNotification(message);
  } else if (Platform.OS === 'ios') {
    // Send iOS notification
    sendIOSNotification(message);
  }
};

// Function to send a noisy notification based on platform
export const sendNotificationNoisy = (message) => {
  if (Platform.OS === 'web') {
    // Send noisy web notification
    sendWebNotificationNoisy(message);
  } else if (Platform.OS === 'ios') {
    // Send noisy iOS notification
    sendIOSNotificationNoisy(message);
  }
};
