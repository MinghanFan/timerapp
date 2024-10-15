// Import the Notifications module from expo-notifications
import * as Notifications from 'expo-notifications';

// Function to initialize notifications and request permissions
export const initializeNotifications = async () => {
  // Check the current permission status
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  // If permission is not granted, request it
  if (finalStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // If permission is still not granted after request, alert the user and return false
  if (finalStatus !== 'granted') {
    alert('Permission for notifications was not granted.');
    return false;
  }

  // Permission granted, return true
  return true;
};

// Function to send a web notification
export const sendWebNotification = (message) => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
    return;
  }

  // Check if the user has granted permission to display notifications
  // If permission is granted, create a new notification
  if (Notification.permission === "granted") {
    new Notification(message);
    duration = 1200;
    
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
};

export const sendWebNotificationNoisy = (message) => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
    return;
  }

  // Check if the user has granted permission to display notifications
  // If permission is granted, create a new notification
  if (Notification.permission === "granted") {
    new Notification(message);
    duration = 1200;
    const audio = new Audio("harp_lightcurve-[AudioTrimmer.com].mp3");
    audio.play();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}