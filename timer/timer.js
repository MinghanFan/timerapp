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
  // If permission is not denied, request it
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
};

// Function to start the timer
export const startTimer = async (setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning) => {
  // Initialize notifications and set the permission status
  const permissionGranted = await initializeNotifications();
  setHasPermission(permissionGranted);

  // If permission is granted and timer is not already running, start the timer
  if (permissionGranted && !isRunning) {
    setIsRunning(true);
    const id = setInterval(() => {
      setTimeRemaining(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
    setIntervalId(id);
  }
};

// Function to pause the timer
export const pauseTimer = (setIsRunning, intervalId) => {
  if (intervalId) {
    clearInterval(intervalId);
    setIsRunning(false); 
  }
};

// Function to exit the timer and reset it
export const exitTimer = (setIsRunning, setTimeRemaining, setIntervalId, intervalId) => {
  clearInterval(intervalId);
  setIsRunning(false);
  setTimeRemaining(10);  // Reset the timer to 10 seconds
};

// Function to format time in MM:SS format
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

