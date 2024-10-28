// Import the Notifications module from expo-notifications
import * as Notifications from 'expo-notifications';


// Function to initialize notifications and request permissions for Android
export const initializeAndroidNotifications = async () => {
  // Request notification permissions using expo-notifications
  const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission for notifications not granted!');
      return;
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
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reminder',
      body: message,
      sound: true, // Default sound on Android
    },
    trigger: { seconds: 1 },
  });
};

//Function to send a noisy notification on Android with a custom sound
export const sendAndroidNotificationNoisy = async (message) => {
  try {
    // Schedule a notification with a custom sound
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Noisy Reminder',
        body: message,
        sound: 'harp_lightcurve-[AudioTrimmer.com].mp3', // Path to your custom sound
      },
      trigger: { seconds: 1 },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};
