// Import the Notifications module from expo-notifications
import * as Notifications from 'expo-notifications';

// Function to initialize notifications and request permissions for iOS
export const initializeIOSNotifications = async () => {
  // Request notification permissions using expo-notifications
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  // If permission hasn't been granted, request it
  if (finalStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // If permission is still not granted, alert the user and return false
  if (finalStatus !== 'granted') {
    alert('Permission for notifications was not granted.');
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

// Function to send a simple notification on iOS (similar to web)
export const sendIOSNotification = async (message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reminder',
      body: message,
      sound: true,
    },
    trigger: { seconds: 1 },
  });
};

// Function to send a noisy notification on iOS with a custom sound
export const sendIOSNotificationNoisy = async (message) => {
    try {
      // Schedule a notification with a custom sound
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Noisy Reminder',
          body: message,
          sound: 'timer/test.wav', 
        },
        trigger: { seconds: 1 },
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };
