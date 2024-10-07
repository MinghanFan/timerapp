let duration = (10)
// Import the notification-related functions
import { initializeNotifications } from './notifications';

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
    }, duration*100);
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
  setTimeRemaining(duration);  // Reset the timer to 10 seconds
};

// Function to format time in MM:SS format
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const setTimerLength = (newDuration) => {
  duration = newDuration;
}