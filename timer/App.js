// Core imports for React Native functionality
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Modal, Platform } from 'react-native';

// Custom utility imports
import { startTimer, pauseTimer, exitTimer, formatTime } from './timer.js';
import { Ionicons } from '@expo/vector-icons';
import { colorThemes, getThemeStyles, getThemeColors } from './style.js';
import { getTranslation, getAvailableLanguages } from './language';
import TreeProgress from './TreeProgress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // ============= STATE MANAGEMENT =============
  
  // Timer Core States
  const [timeRemaining, setTimeRemaining] = useState(1200);  // 20 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Timer Configuration States
  const [inputDuration, setInputDuration] = useState('');
  const [timerDuration, setTimerDuration] = useState(1200);
  
  // Notification States
  const [hasPermission, setHasPermission] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const [loudNotificationsEnabled, setLoudNotificationsEnabled] = useState(false);
  
  // UI States
  const [modalVisible, setModalVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [themeIndex, setThemeIndex] = useState(2);
  
  // Progress Tracking States
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showTreeProgress, setShowTreeProgress] = useState(false);

  // ============= NOTIFICATION SETUP =============
  
  // Initialize notification module with default empty functions
  const [notificationModule, setNotificationModule] = useState({
    initialize: () => {},
    sendNotification: () => {},
    sendNoisyNotification: () => {},
    sendAfterNotification: () => {}
  });

  // Handler for completing a session
  const handleSessionComplete = () => {
    setCompletedSessions(prev => prev + 1);
  };

  // ============= EFFECTS =============

  // Platform-specific notification initialization
  useEffect(() => {
    let initializeNotifications, sendNotification, sendNoisyNotification, sendAfterNotification;

    // Determine platform and load appropriate notification module
    if (Platform.OS === 'ios') {
      setDeviceType('iOS');
      ({ 
        initializeIOSNotifications: initializeNotifications, 
        sendIOSNotification: sendNotification, 
        sendIOSNotificationNoisy: sendNoisyNotification, 
        sendIOSNotification: sendAfterNotification 
      } = require('./iosNotifications'));
    } else if (Platform.OS === 'android') {
      setDeviceType('Android');
      ({ 
        initializeAndroidNotifications: initializeNotifications,
        sendAndroidNotification: sendNotification,
        sendAndroidNotificationNoisy: sendNoisyNotification,
        sendAndroidNotification: sendAfterNotification 
      } = require('./androidNotifications'));
    } else {
      setDeviceType('Web');
      ({ 
        initializeWebNotifications: initializeNotifications,
        sendWebNotification: sendNotification,
        sendWebNotificationNoisy: sendNoisyNotification,
        sendWebAfterNotification: sendAfterNotification 
      } = require('./webNotifications'));
    }

    // Configure notification module with language support
    setNotificationModule({
      initialize: (lang) => initializeNotifications(lang),
      sendNotification: (msg) => sendNotification(msg, currentLanguage),
      sendNoisyNotification: (msg) => sendNoisyNotification(msg, currentLanguage),
      sendAfterNotification: (msg) => sendAfterNotification(msg, currentLanguage),
    });    

    // Initialize notifications and check permissions
    initializeNotifications(currentLanguage).then(granted => {
      setHasPermission(granted);
    });

    // Cleanup interval on unmount
    return () => clearInterval(intervalId); 
  }, [intervalId]);

  // Timer completion handler
  useEffect(() => {
    if (timeRemaining === 0 && !notificationSent) {
      handleSessionComplete();
      
      // Construct completion message
      const message = `${Math.floor(timerDuration / 60)} ${getTranslation(currentLanguage, 'minutes')} 
        ${timerDuration % 60} ${getTranslation(currentLanguage, 'seconds')} 
        ${getTranslation(currentLanguage, 'completed')}`;
      
      // Send appropriate notification based on settings
      if (loudNotificationsEnabled) {
        notificationModule.sendNoisyNotification(message, currentLanguage);
        setTimeout(() => {
          notificationModule.sendNoisyNotification(
            getTranslation(currentLanguage, 'goodToGo'), 
            currentLanguage
          );
        }, 20000);
      } else {
        notificationModule.sendNotification(message, currentLanguage);
        setTimeout(() => {
          notificationModule.sendAfterNotification(
            getTranslation(currentLanguage, 'goodToGo'), 
            currentLanguage
          );
        }, 20000);
      }      

      // Reset states
      setNotificationSent(true);
      setTimeRemaining(timerDuration);
      
      // Reset notification flag after delay
      setTimeout(() => {
        setNotificationSent(false);
      }, 1000);
    }
  }, [timeRemaining, notificationSent, timerDuration, loudNotificationsEnabled, notificationModule]);

  // Language change handler
  useEffect(() => {
    if (notificationModule.initialize) {
      notificationModule.initialize(currentLanguage);
    }
  }, [currentLanguage, notificationModule]);  

  // Load saved sessions from storage
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const saved = await AsyncStorage.getItem('completedSessions');
        if (saved !== null) {
          setCompletedSessions(parseInt(saved, 10));
        }
      } catch (e) {
        console.error('Error loading sessions:', e);
      }
    };
    loadSessions();
  }, []);
  
  // Save sessions to storage
  useEffect(() => {
    const saveSessions = async () => {
      try {
        await AsyncStorage.setItem('completedSessions', completedSessions.toString());
      } catch (e) {
        console.error('Error saving sessions:', e);
      }
    };
    saveSessions();
  }, [completedSessions]);

  // ============= EVENT HANDLERS =============

  // Timer control handlers
  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer(setIsRunning, intervalId);
      setIsPaused(true);
    } else {
      setNotificationSent(false);
      if (!isPaused) {
        startTimer(
          setHasPermission, 
          setIsRunning, 
          setIntervalId, 
          setTimeRemaining, 
          isRunning, 
          timerDuration
        );
      } else {
        startTimer(
          setHasPermission, 
          setIsRunning, 
          setIntervalId, 
          setTimeRemaining, 
          isRunning, 
          timeRemaining
        );
      }
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    pauseTimer(setIsRunning, intervalId); 
    setIsPaused(true); 
  };

  const handleSetDuration = () => {
    const newDuration = (parseInt(inputDuration, 10)) * 60;
    if (!isNaN(newDuration) && newDuration > 0) {
      setTimerDuration(newDuration);
      setTimeRemaining(newDuration);
      setInputDuration('');
    }
  };

  // UI control handlers
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

  // Apply theme styling
  const styles = getThemeStyles(themeIndex);
  const colors = getThemeColors(themeIndex);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* =================
          Header Controls 
          ================= */}
      {/* Settings gear icon button */}
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => setSettingsModalVisible(true)}
      >
        <Ionicons 
          name="settings-outline" 
          size={24} 
          color={styles.buttonText.color} 
        />
      </TouchableOpacity>
  
      {/* Tree progress button - Android only */}
      {deviceType === 'Android' && (
        <TouchableOpacity 
          style={styles.treeButton}
          onPress={() => setShowTreeProgress(true)}
        >
          <Ionicons 
            name="leaf-outline" 
            size={24} 
            color={styles.buttonText.color} 
          />
        </TouchableOpacity>
      )}
  
      {/* =================
          Main Timer UI 
          ================= */}
      {/* Timer title */}
      <Text style={styles.titleText}>
        {getTranslation(currentLanguage, 'timerTitle')}
      </Text>
      
      {/* Timer display with remaining time */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>
          {getTranslation(currentLanguage, 'timeRemaining')}:
        </Text>
        <Text style={styles.timeDisplay}>
          {formatTime(timeRemaining)}
        </Text>
      </View>
      
      {/* Notification Permission Warning */}
      {!hasPermission && (
        <Text style={styles.permissionText}>
          {getTranslation(currentLanguage, 'permissionWarning')}
        </Text>
      )}
      
      {/* =================
          Timer Controls 
          ================= */}
      {/* Start/Pause and Reset buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={handleStartPause} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isRunning 
              ? getTranslation(currentLanguage, 'pause') 
              : getTranslation(currentLanguage, 'start')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => exitTimer(setIsRunning, setTimeRemaining, setIntervalId, intervalId)} 
          style={[styles.button, styles.exitButton]}
        >
          <Text style={styles.buttonText}>
            {getTranslation(currentLanguage, 'reset')}
          </Text>
        </TouchableOpacity>
      </View>
  
      {/* =================
          Timer Duration Settings 
          ================= */}
      {/* Duration input and set button */}
      <View style={styles.setterContainer}>
        <Text style={styles.setterLabel}>
          {getTranslation(currentLanguage, 'setDuration')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={getTranslation(currentLanguage, 'enterMinutes')}
          keyboardType="numeric"
          value={inputDuration}
          onChangeText={setInputDuration}
          onSubmitEditing={handleSetDuration}
        />
        <TouchableOpacity 
          onPress={handleSetDuration} 
          style={styles.setButton}
        >
          <Text style={styles.buttonText}>
            {getTranslation(currentLanguage, 'set')}
          </Text>
        </TouchableOpacity>
      </View>
  
      {/* =================
          Web-specific Controls 
          ================= */}
      {/* Notification settings - Web only */}
      {deviceType === 'Web' && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationLabel}>
            {getTranslation(currentLanguage, 'notificationSettings')}:
          </Text>
          <TouchableOpacity 
            onPress={toggleLoudNotifications} 
            style={[
              styles.button, 
              loudNotificationsEnabled ? styles.loudButton : styles.quietButton
            ]}
          >
            <Text style={styles.buttonText}>
              {loudNotificationsEnabled
                ? getTranslation(currentLanguage, 'loudOn')
                : getTranslation(currentLanguage, 'quietOn')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
  
      {/* About button */}
      <TouchableOpacity 
        onPress={toggleModal} 
        style={styles.aboutButton}
      >
        <Text style={styles.buttonText}>
          {getTranslation(currentLanguage, 'about')}
        </Text>
      </TouchableOpacity>
  
      {/* =================
          Progress Tracking 
          ================= */}
      {/* Tree progress component - Web only */}
      {deviceType === 'Web' && (
        <View style={styles.treeContainer}>
          <TreeProgress 
            completedSessions={completedSessions}
            onClose={() => setShowTreeProgress(false)}
            colors={colors}
            onReset={() => setCompletedSessions(0)} 
            language={currentLanguage}
          /> 
        </View>
      )}
  
      {/* =================
          Modals 
          ================= */}
      {/* Tree Progress Modal - Android only */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTreeProgress}
        onRequestClose={() => setShowTreeProgress(false)}
      >
        <View style={styles.modalContainer}>
          <TreeProgress 
            completedSessions={completedSessions}
            onClose={() => setShowTreeProgress(false)}
            colors={colors}
            onReset={() => setCompletedSessions(0)} 
            language={currentLanguage}
          />
        </View>
      </Modal>
  
      {/* 20/20/20 Rule Information Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {getTranslation(currentLanguage, 'ruleTitle')}
            </Text>
            <Text style={styles.modalText}>
              {getTranslation(currentLanguage, 'ruleDescription')}
            </Text>
            <Text style={styles.modalText}>
              {getTranslation(currentLanguage, 'ruleStep1')}
            </Text>
            <Text style={styles.modalText}>
              {getTranslation(currentLanguage, 'ruleStep2')}
            </Text>
            <Text style={styles.modalText}>
              {getTranslation(currentLanguage, 'ruleStep3')}
            </Text>
            <Text style={styles.modalText}>
              {getTranslation(currentLanguage, 'ruleFooter')}
            </Text>
            <TouchableOpacity 
              onPress={toggleModal} 
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {getTranslation(currentLanguage, 'settings')}
            </Text>
            {/* Theme selection list */}
            <View style={styles.themeListContainer}>
              <Text style={styles.modalText}>
                {getTranslation(currentLanguage, 'chooseTheme')}
              </Text>
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
                    {getTranslation(
                      currentLanguage, 
                      `theme_${theme.name.toLowerCase().replace(/\s+/g, '_')}`
                    )}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              onPress={() => setSettingsModalVisible(false)} 
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>
                {getTranslation(currentLanguage, 'close')}
              </Text>
            </TouchableOpacity>

            {/* Language selection button - Web only */}
            {Platform.OS === 'web' && (
              <TouchableOpacity 
                onPress={() => setLanguageModalVisible(true)} 
                style={styles.settingsButton}
              >
                <Text style={styles.buttonText}>
                  {getTranslation(currentLanguage, 'Language')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {getTranslation(currentLanguage, 'Language')}
            </Text>
            <View style={styles.languageListContainer}>
              {getAvailableLanguages().map((lang) => (
                <TouchableOpacity
                  key={lang}
                  onPress={() => {
                    setCurrentLanguage(lang);
                    setLanguageModalVisible(false);
                  }}
                  style={[
                    styles.languageButton,
                    lang === currentLanguage && styles.selectedLanguage
                  ]}
                >
                  <Text style={styles.languageButton}>
                    {lang.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity 
              onPress={() => setLanguageModalVisible(false)} 
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>
                {getTranslation(currentLanguage, 'close')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </ScrollView>
  );
}
