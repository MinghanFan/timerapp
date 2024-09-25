import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { 
  initializeNotifications, 
  sendWebNotification, 
  startTimer, 
  pauseTimer, 
  exitTimer, 
  formatTime, 
  testNotification 
} from './timer.js';

export default function App() {
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); 
  const [isRunning, setIsRunning] = useState(false);  
  const [intervalId, setIntervalId] = useState(null); 
  const [hasPermission, setHasPermission] = useState(false);  

  useEffect(() => {
    initializeNotifications().then(granted => {
      setHasPermission(granted);
    });

    return () => clearInterval(intervalId); 
  }, [intervalId]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Time remaining:</Text>
      <Text style={styles.timeDisplay}>{formatTime(timeRemaining)}</Text>
      
      {!hasPermission && (
        <Text style={styles.permissionText}>Please enable notifications to receive break reminders</Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Button 
          onPress={() => startTimer(setHasPermission, setIsRunning, setIntervalId, setTimeRemaining, isRunning)} 
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
          onPress={() => testNotification(initializeNotifications)} 
          title="Test Notification" 
          color="green" 
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeDisplay: {
    fontSize: 48,  
    fontWeight: 'bold',
    textAlign: 'center',  
    marginBottom: 20,
  },
  permissionText: {
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '60%',
  }
});
