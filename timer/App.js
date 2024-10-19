import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { startTimer, pauseTimer, exitTimer, formatTime } from './timerNew.js';
import { initializeNotifications, sendWebNotification, sendWebNotificationNoisy } from './notifications';
import styles from './style.js';


export default function App() {
  const [timeRemaining, setTimeRemaining] = useState(1200); 
  const [isRunning, setIsRunning] = useState(false);  
  const [intervalId, setIntervalId] = useState(null); 
  const [hasPermission, setHasPermission] = useState(false);  
  const [notificationSent, setNotificationSent] = useState(false); 
  const [inputDuration, setInputDuration] = useState(''); // State for input
  const [timerDuration, setTimerDuration] = useState(1200); // State for timer duration
  const [isPaused, setIsPaused] = useState(false); // State for pause

  useEffect(() => {
    initializeNotifications().then(granted => {
      setHasPermission(granted);
    });

    return () => clearInterval(intervalId); 
  }, [intervalId]);

  useEffect(() => {
    if (timeRemaining === 0 && !notificationSent) {
      if (typeof window !== "undefined") {
        sendWebNotification(`${timerDuration / 60} minutes completed`);

        setTimeout(() => {
          sendWebNotification("20s after");
        }, 20000); 
      }

      setNotificationSent(true);

      clearInterval(intervalId);
      setIsRunning(false);

      setTimeout(() => {
        setTimeRemaining(timerDuration); 
        setNotificationSent(false); 
      }, 1000); 
    }
  }, [timeRemaining, notificationSent, intervalId, timerDuration]);

  const handleStart = () => {
    setNotificationSent(false);
    if (!isPaused) {
      startTimer(setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning, timerDuration); 
    } else {
      startTimer(setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning, timeRemaining); 
    }
    setIsPaused(false);
  };

  const handlePause = () => {
    pauseTimer(setIsRunning, intervalId); 
    setIsPaused(true); 
  };

  const handleSetDuration = () => {
    const newDuration = parseInt(inputDuration, 10);
    if (!isNaN(newDuration) && newDuration > 0) {
      setTimerDuration(newDuration); // Update State
      setTimeRemaining(newDuration); // Reset time remaining
      setInputDuration(''); // Clear input after setting duration
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>20/20/20 vision</Text>
      <Text style={styles.timerText}>Time remaining:</Text>
      <Text style={styles.timeDisplay}>{formatTime(timeRemaining)}</Text>
      
      {!hasPermission && (
        <Text style={styles.permissionText}>Please enable notifications to receive break reminders</Text>
      )}
      <View style={styles.buttonContainer2}>
      <Button 
          onPress={() => sendWebNotificationNoisy("Loud notification")} 
          title="Loud Notification" 
          color="green" 
          style={styles.button}
        />
        <Button 
          onPress={handlePause} 
          title="About" 
          style={styles.button}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          onPress={handleStart} 
          title="Start" 
          style={styles.button}
        />
        <Button 
          onPress={handlePause} 
          title="Pause" 
          style={styles.button}
        />
        <Button 
          onPress={() => exitTimer(setIsRunning, setTimeRemaining, setIntervalId, intervalId)} 
          title="Exit" 
          color="red" 
          style={styles.button}
        />
      
      </View>

      <View style={styles.setterContainer}>
      <Button 
        onPress={handleSetDuration}
        title="Set Duration"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter duration in seconds"
        keyboardType="numeric"
        value={inputDuration}
        onChangeText={setInputDuration}
      />

      </View>

      <StatusBar style="auto" />
    </View>
  );
}