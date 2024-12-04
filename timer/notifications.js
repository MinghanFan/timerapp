import { Platform } from 'react-native'; // Import Platform to detect the environment

// Import web-specific notifications
import { sendWebNotification, sendWebNotificationNoisy, initializeWebNotifications, sendWebAfterNotification } from './webNotifications';

// Import iOS-specific notifications
import { sendIOSNotification, sendIOSNotificationNoisy, initializeIOSNotifications } from './iosNotifications';

//import android-specific notifications
import { sendAndroidNotification, sendAndroidNotificationNoisy, initializeAndroidNotifications } from './androidNotifications';

// Function to initialize notifications based on platform
export const initializeNotifications = async () => {
  if (Platform.OS === 'web') {
    // Initialize web notifications
    return await initializeWebNotifications();
  } else if (Platform.OS === 'ios') {
    // Initialize iOS notifications
    return await initializeIOSNotifications();
  } else if (Platform.OS === 'android') {
    // Initialize Android notifications
    return await initializeAndroidNotifications();
  }
};

// Function to send a notification based on platform
export const sendNotification = (message, themeIndex) => {
  if (Platform.OS === 'web') {
    // Send web notification
    sendWebNotification(message);
  } else if (Platform.OS === 'ios') {
    // Send iOS notification
    sendIOSNotification(message);
  } else if (Platform.OS === 'android') {
    // Send Android notification
    sendAndroidNotification(message, themeIndex);
  }
};

export const sendAfterNotification = (message) => {
  if (Platform.OS === 'web') {
    // Send web notification
    sendWebAfterNotification(message);
  } else if (Platform.OS === 'ios') {
    // Send iOS notification
    sendIOSNotification(message);
  } else if (Platform.OS === 'android') {
    // Send Android notification
    sendAndroidNotification(message);
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
  } else if (Platform.OS === 'android') {
    // Send noisy Android notification
    sendAndroidNotificationNoisy(message);
  }
};
