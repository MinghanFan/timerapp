import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Modal, Platform } from 'react-native';
import { startTimer, pauseTimer, exitTimer, formatTime } from './timerNew.js';
import { Ionicons } from '@expo/vector-icons';
import { colorThemes, getThemeStyles, getThemeColors } from './style.js';

export default function App() {
  const [timeRemaining, setTimeRemaining] = useState(1200);  // State for time remaining
  const [isRunning, setIsRunning] = useState(false);  // State for timer running
  const [intervalId, setIntervalId] = useState(null); // State for interval ID
  const [hasPermission, setHasPermission] = useState(false);  // State for permission
  const [notificationSent, setNotificationSent] = useState(false); // State for notification sent
  const [inputDuration, setInputDuration] = useState(''); // State for input
  const [timerDuration, setTimerDuration] = useState(1200); // State for timer duration
  const [isPaused, setIsPaused] = useState(false); // State for pause
  const [loudNotificationsEnabled, setLoudNotificationsEnabled] = useState(false); // New state for loud notifications
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [deviceType, setDeviceType] = useState(''); // State for device type
  const [notificationModule, setNotificationModule] = useState({
    initialize: () => {},
    sendNotification: () => {},
    sendNoisyNotification: () => {},
    sendAfterNotification: () => {}
  });
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [themeIndex, setThemeIndex] = useState(2); // Starting with dark mode (index 4)

  // Initialize notifications based on platform
  useEffect(() => {
    let initializeNotifications, sendNotification, sendNoisyNotification, sendAfterNotification;

    if (Platform.OS === 'ios') {
      setDeviceType('iOS');
      ({ initializeIOSNotifications: initializeNotifications, sendIOSNotification: sendNotification, sendIOSNotificationNoisy: sendNoisyNotificationm, sendIOSNotification: sendAfterNotification} = require('./iosNotifications'));
    } else if (Platform.OS === 'android') {
      setDeviceType('Android');
      ({ initializeAndroidNotifications: initializeNotifications, sendAndroidNotification: sendNotification, sendAndroidNotificationNoisy: sendNoisyNotification, sendAndroidNotification: sendAfterNotification } = require('./androidNotifications'));
    } else {
      setDeviceType('Web');
      ({ initializeWebNotifications: initializeNotifications, sendWebNotification: sendNotification, sendWebNotificationNoisy: sendNoisyNotification, sendWebAfterNotification: sendAfterNotification  } = require('./webNotifications'));
    }

    setNotificationModule({ initialize: initializeNotifications, sendNotification, sendNoisyNotification, sendAfterNotification });

    initializeNotifications().then(granted => {
      setHasPermission(granted);
    });

    return () => clearInterval(intervalId); 
  }, [intervalId]);


  useEffect(() => {
    if (timeRemaining === 0 && !notificationSent) {
      const message = `${Math.floor(timerDuration / 60)} minutes ${timerDuration % 60} seconds completed`;
      
      if (loudNotificationsEnabled) {
        notificationModule.sendNoisyNotification(message);
        setTimeout(() => {
          notificationModule.sendNoisyNotification("20s after");
        }, 20000);
      } else {
        notificationModule.sendNotification(message, themeIndex);
        setTimeout(() => {
          notificationModule.sendAfterNotification("20s after");
        }, 20000);
      }

      setNotificationSent(true);
      setTimeRemaining(timerDuration); // Reset timeRemaining to timer duration for screen display

      // Reset notificationSent to allow notifications in the next cycle
      setTimeout(() => {
        setNotificationSent(false);
      }, 1000); // Small delay to reset notificationSent
    }
  }, [timeRemaining, notificationSent, timerDuration, loudNotificationsEnabled, notificationModule]);

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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleThemeChange = (index) => {
    setThemeIndex(index);
    setSettingsModalVisible(false);
  };

  // Get current styles and colors based on theme
  const styles = getThemeStyles(themeIndex);
  const colors = getThemeColors(themeIndex);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => setSettingsModalVisible(true)}
      >
        <Ionicons name="settings-outline" size={24} color={styles.buttonText.color} />
      </TouchableOpacity>

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
      {deviceType === 'Web' && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationLabel}>Notification Settings:</Text>
          <TouchableOpacity onPress={toggleLoudNotifications} style={[styles.button, loudNotificationsEnabled ? styles.loudButton : styles.quietButton]}>
            <Text style={styles.buttonText}>
              {loudNotificationsEnabled ? 'Loud Notifications On' : 'Quiet Notifications On'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* About Section */}
      <TouchableOpacity onPress={toggleModal} style={styles.aboutButton}>
        <Text style={styles.buttonText}>About 20/20/20 Rule</Text>
      </TouchableOpacity>

      {/* Modal for 20/20/20 Rule Information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>The 20/20/20 Rule</Text>
            <Text style={styles.modalText}>
              The 20/20/20 rule is a simple guideline to reduce eye strain caused by looking at digital screens for extended periods:
            </Text>
            <Text style={styles.modalText}>
              • Every 20 minutes
            </Text>
            <Text style={styles.modalText}>
              • Look at something 20 feet away
            </Text>
            <Text style={styles.modalText}>
              • For at least 20 seconds
            </Text>
            <Text style={styles.modalText}>
              This practice helps relax the eye muscles and reduces the risk of computer vision syndrome and digital eye strain.
            </Text>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            
            <View style={styles.themeListContainer}>
              <Text style={styles.modalText}>Choose Theme:</Text>
              {colorThemes.map((theme, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.themeOptionContainer,
                    themeIndex === index && styles.selectedTheme
                  ]}
                  onPress={() => handleThemeChange(index)}
                >
                  <View 
                    style={[
                      styles.themeColorPreview,
                      { backgroundColor: theme.background }
                    ]}
                  />
                  <Text style={styles.themeOptionText}>
                    {theme.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              onPress={() => setSettingsModalVisible(false)} 
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </ScrollView>
  );
}
