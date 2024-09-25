import * as Notifications from 'expo-notifications';

async function sendNotification(message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Eye Strain Reminder',
      body: message,
    },
    trigger: null, 
  });
}

function startEyeRelaxationTimer() {
  const twentyMinutes = 20 * 60 * 1000;
  const twentySeconds = 20 * 1000;

  setTimeout(async () => {
    await sendNotification('Time to look away from the screen for 20 seconds!');

    setTimeout(async () => {
      await sendNotification('You can return to the screen now!');

      startEyeRelaxationTimer();
    }, twentySeconds);
  }, twentyMinutes);
}

export async function initializeNotifications() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const permission = await Notifications.requestPermissionsAsync();
    if (permission.status !== 'granted') {
      console.log('Permission to send notifications is not granted');
      return;
    }
  }

  startEyeRelaxationTimer();
}
