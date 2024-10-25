// Import the notification-related functions
import { initializeNotifications } from './notifications';

// Default duration (ensure it's initialized correctly)
export let duration = 1200; // 1200 seconds = 20 minutes

// Function to start the timer
export const startTimer = async (setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning, duration) => {
  // Initialize notifications and set the permission status
  const permissionGranted = await initializeNotifications();
  setHasPermission(permissionGranted);

  // If permission is granted and timer is not already running, start the timer
  if (permissionGranted && !isRunning) {
    setIsRunning(true);

    // Validate duration
    if (isNaN(duration) || duration <= 0) {
      console.error('Invalid duration value');
      setTimeRemaining(0);
      return;
    }

    // Initialize the interval
    const id = setInterval(() => {
      setIsRunning(true);

      // Update the remaining time every second
      setTimeRemaining((prevTime) => {
        // If time is up, reset to the duration and send a notification
        if (prevTime <= 0) {
          setTimeout(() => {
            setTimeRemaining(duration); // Reset timeRemaining to the initial duration
          }, 1000);

          // Trigger notification and repeat
          if (permissionGranted) {
            setTimeout(() => {
              // Trigger the follow-up notification 20 seconds after the first
              if (typeof notificationFunction === 'function') {
                notificationFunction("20s after");
              }
            }, 20000);
          }
          return duration; // Reset countdown
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    // Save the interval ID for later use
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
  setTimeRemaining(duration);  // Reset the timer to initial duration
};

// Function to format time in MM:SS format
export const formatTime = (time) => {
  if (isNaN(time) || time < 0) return "00:00"; // Handle invalid time
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Function to set a new timer length
export const setTimerLength = (newDuration) => {
  duration = parseInt(newDuration, 10); // Ensure the duration is a valid number
};
