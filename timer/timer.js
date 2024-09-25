import * as Notifications from 'expo-notifications';

export const initializeNotifications = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (finalStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Permission for notifications was not granted.');
    return false;
  }

  return true;
};

export const sendWebNotification = (message) => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
};

export const startTimer = async (setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning) => {
  const permissionGranted = await initializeNotifications();
  setHasPermission(permissionGranted);

  if (permissionGranted && !isRunning) {
    setIsRunning(true);
    const id = setInterval(() => {
      setTimeRemaining(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
    setIntervalId(id);
  }
};

export const pauseTimer = (setIsRunning, intervalId) => {
  if (intervalId) {
    clearInterval(intervalId);
    setIsRunning(false);
  }
};

export const exitTimer = (setIsRunning, setTimeRemaining, setIntervalId, intervalId) => {
  clearInterval(intervalId);
  setIsRunning(false);
  setTimeRemaining(20 * 60);  
};

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const testNotification = async (initializeNotifications) => {
  if (typeof window !== "undefined") {
    sendWebNotification("Test notification from web");
  }

  if (await initializeNotifications()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test notification",
      },
      trigger: null,  
    });
  }
};
