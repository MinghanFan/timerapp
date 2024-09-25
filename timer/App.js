import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

const initializeNotifications = async () => {
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

const sendWebNotification = (message) => {
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

export default function App() {
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); 
  const [isRunning, setIsRunning] = useState(false);  
  const [intervalId, setIntervalId] = useState(null); 
  const [hasPermission, setHasPermission] = useState(false);  

  const startTimer = async () => {
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

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  const exitTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimeRemaining(20 * 60);  
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const testNotification = async () => {
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
        <Button onPress={startTimer} title="Start" />
        <Button onPress={pauseTimer} title="Pause" />
        <Button onPress={exitTimer} title="Exit" color="red" />
        <Button onPress={testNotification} title="Test Notification" color="green" />
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
