import { StyleSheet } from 'react-native';

// Color themes array with names
export const colorThemes = [
  {
    name: "Forest",
    background: '#A8C3A0', 
    text: '#2E4600', 
    timerText: '#4B5320', 
    buttonBackground: '#6B8E23', 
    buttonText: '#FFFFFF', 
    errorText: '#D9534F',
  },
  {
    name: "Light Classic",
    background: '#FFFFFF',
    text: '#333',
    timerText: '#333',
    buttonBackground: '#E0E0E0',
    buttonText: '#000',
    errorText: 'darkred',
  },
  {
    name: "Ocean",
    background: '#265266',
    text: '#fff',
    timerText: '#fff',
    buttonBackground: '#E0E0E0',
    buttonText: '#000',
    errorText: '#000',
  },
  {
    name: "Lavender Light",
    background: '#fff7ff',
    text: '#000',
    timerText: '#000',
    buttonBackground: '#ddabdc',
    buttonText: '#000',
    errorText: '#000',
  },
  {
    name: "Night Mode",
    background: '#1c1b29', 
    text: '#c3c8e7',
    timerText: '#c3c8e7',
    buttonBackground: '#46436f', 
    buttonText: '#ffffff', 
    errorText: '#ff5555', 
  },
];

// Create a theme context
export const getThemeStyles = (themeIndex) => {
  const selectedTheme = colorThemes[themeIndex];
  
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: selectedTheme.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    treeContainer: {
      flexGrow: 1,
      zIndex: -1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    titleText: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: selectedTheme.timerText,
      textAlign: 'center',
    },
    timerContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    timerLabel: {
      fontSize: 18,
      color: selectedTheme.text,
      marginBottom: 5,
    },
    timeDisplay: {
      fontSize: 60,
      fontWeight: 'bold',
      color: selectedTheme.timerText,
    },
    permissionText: {
      color: selectedTheme.errorText,
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 30,
    },
    button: {
      backgroundColor: selectedTheme.buttonBackground,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      minWidth: 100,
      alignItems: 'center',
    },
    buttonText: {
      color: selectedTheme.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    exitButton: {
      backgroundColor: '#FF6B6B',
    },
    setterContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 30,
    },
    setterLabel: {
      fontSize: 16,
      color: selectedTheme.text,
      marginBottom: 10,
    },
    input: {
      backgroundColor: selectedTheme.buttonBackground,
      color: selectedTheme.buttonText,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      fontSize: 16,
      width: '50%',
      marginBottom: 10,
    },
    setButton: {
      backgroundColor: selectedTheme.buttonBackground,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    notificationContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 30,
    },
    notificationLabel: {
      fontSize: 16,
      color: selectedTheme.text,
      marginBottom: 10,
    },
    loudButton: {
      backgroundColor: '#FF9F1C',
    },
    quietButton: {
      backgroundColor: '#2EC4B6',
    },
    aboutButton: {
      backgroundColor: selectedTheme.buttonBackground,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: selectedTheme.background,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '80%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: selectedTheme.text,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'left',
      color: selectedTheme.text,
    },
    closeButton: {
      backgroundColor: selectedTheme.buttonBackground,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 15,
    },
    settingsButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: selectedTheme.buttonBackground,
      padding: 10,
      borderRadius: 25,
    },
    themeOptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      width: '100%',
    },
    themeColorPreview: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 10,
    },
    themeOptionText: {
      fontSize: 16,
      color: selectedTheme.text,
    },
    themeListContainer: {
      width: '100%',
      marginVertical: 10,
    },
    selectedTheme: {
      borderWidth: 2,
      borderColor: selectedTheme.buttonBackground,
    },
    languageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    languageButton: {
      backgroundColor: selectedTheme.buttonBackground,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    languageListContainer: {
      width: '100%',
      marginVertical: 10
    },
    languageButtonText: {
      color: selectedTheme.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    treeButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      backgroundColor: selectedTheme.buttonBackground,
      padding: 10,
      borderRadius: 25,
    },
    resetButton: {
      backgroundColor: '#FF6B6B', // Red color for emphasis
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 10, // Add spacing
    },
  });
};

// Export a function to get the current theme colors
export const getThemeColors = (themeIndex) => {
  return colorThemes[themeIndex];
};
