import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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
  const [loudNotificationsEnabled, setLoudNotificationsEnabled] = useState(false); // New state for loud notifications


  useEffect(() => {
    initializeNotifications().then(granted => {
      setHasPermission(granted);
    });

    return () => clearInterval(intervalId); 
  }, [intervalId]);

  useEffect(() => {
    if (timeRemaining === 0 && !notificationSent) {
      if (loudNotificationsEnabled) {
        if (typeof window !== "undefined") {
          sendWebNotificationNoisy(`${timerDuration / 60} minutes completed`);
          
          setTimeout(() => {
            sendWebNotificationNoisy("20s after");
          }, 20000);
        }
      } else {
        if (typeof window !== "undefined") {
          sendWebNotification(`${timerDuration / 60} minutes completed`);

          setTimeout(() => {
            sendWebNotification("20s after");
          }, 20000);
        }
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

  const handleStartPause = () => {
    if (isRunning) {
      // Pause functionality
      pauseTimer(setIsRunning, intervalId);
      setIsPaused(true);
    } else {
      // Start functionality
      setNotificationSent(false);
      if (!isPaused) {
        startTimer(setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning, timerDuration);
      } else {
        startTimer(setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning, timeRemaining);
      }
      setIsPaused(false);
    }
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

  const toggleLoudNotifications = () => {
    setLoudNotificationsEnabled(prev => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>20/20/20 Vision Timer</Text>
      
      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Time Remaining:</Text>
        <Text style={styles.timeDisplay}>{formatTime(timeRemaining)}</Text>
      </View>
      
      {/* Notification Permission Warning */}
      {!hasPermission && (
        <Text style={styles.permissionText}>Please enable notifications to receive break reminders</Text>
      )}
      
      {/* Main Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleStartPause} style={styles.button}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => exitTimer(setIsRunning, setTimeRemaining, setIntervalId, intervalId)} style={[styles.button, styles.exitButton]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Timer Duration Setter */}
      <View style={styles.setterContainer}>
        <Text style={styles.setterLabel}>Set Timer Duration:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Seconds"
          keyboardType="numeric"
          value={inputDuration}
          onChangeText={setInputDuration}
        />
        <TouchableOpacity onPress={handleSetDuration} style={styles.setButton}>
          <Text style={styles.buttonText}>Set</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Settings */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationLabel}>Notification Settings:</Text>
        <TouchableOpacity onPress={toggleLoudNotifications} style={[styles.button, loudNotificationsEnabled ? styles.loudButton : styles.quietButton]}>
          <Text style={styles.buttonText}>
            {loudNotificationsEnabled ? 'Loud Notifications On' : 'Quiet Notifications On'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <TouchableOpacity onPress={() => {/* Add about modal logic */}} style={styles.aboutButton}>
        <Text style={styles.buttonText}>About 20/20/20 Rule</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </ScrollView>
  );
}
