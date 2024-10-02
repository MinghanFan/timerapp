import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { 
  initializeNotifications, 
  sendWebNotification, 
  startTimer, 
  pauseTimer, 
  exitTimer, 
  formatTime 
} from './timer.js';
import styles from './style.js';

export default function App() {
  const [timeRemaining, setTimeRemaining] = useState(10); 
  const [isRunning, setIsRunning] = useState(false);  
  const [intervalId, setIntervalId] = useState(null); 
  const [hasPermission, setHasPermission] = useState(false);  
  const [notificationSent, setNotificationSent] = useState(false); 

  useEffect(() => {
    initializeNotifications().then(granted => {
      setHasPermission(granted);
    });

    return () => clearInterval(intervalId); 
  }, [intervalId]);

  useEffect(() => {
    if (timeRemaining === 0 && !notificationSent) {
      if (typeof window !== "undefined") {
        sendWebNotification("10s");

        setTimeout(() => {
          sendWebNotification("10s after");
        }, 10000); 
      }

      setNotificationSent(true);

      clearInterval(intervalId);
      setIsRunning(false);

      setTimeout(() => {
        setTimeRemaining(10);
        setNotificationSent(false); 
      }, 1000); 
    }
  }, [timeRemaining, notificationSent, intervalId]);

  const handleStart = () => {
    setNotificationSent(false);
    startTimer(setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Time remaining:</Text>
      <Text style={styles.timeDisplay}>{formatTime(timeRemaining)}</Text>
      
      {!hasPermission && (
        <Text style={styles.permissionText}>Please enable notifications to receive break reminders</Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Button 
          onPress={handleStart} 
          title="Start" 
        />
        <Button 
          onPress={() => pauseTimer(setIsRunning, intervalId)} 
          title="Pause" 
        />
        <Button 
          onPress={() => exitTimer(setIsRunning, setTimeRemaining, setIntervalId, intervalId)} 
          title="Exit" 
          color="red" 
        />
        <Button 
        onPress={sendWebNotification} 
        title="Test Notification" 
        color="green" 
        />

      </View>

      <StatusBar style="auto" />
    </View>
  );
}
