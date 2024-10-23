import { StyleSheet } from 'react-native';

// Color themes array
const colorThemes = [
  {
    background: '#799191',
    text: '#000',
    timerText: '#000',
    buttonBackground: '#C8D3C4',
    buttonText: '#fff',
    errorText: 'red',
  },
  {
    background: '#FFFFFF',
    text: '#333',
    timerText: '#333',
    buttonBackground: '#E0E0E0',
    buttonText: '#000',
    errorText: 'darkred',
  },
  //just adding this manually for mvp given current mvp design
  {
    background: '#265266',
    text: '#fff',
    timerText: '#fff',
    buttonBackground: '#E0E0E0',
    buttonText: '#000',
    errorText: '#000',
  }
  // Add more themes as needed
];

// Select the desired theme
const selectedTheme = colorThemes[2]; // Change the index to switch themes

const colors = selectedTheme;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.timerText,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerLabel: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 5,
  },
  timeDisplay: {
    fontSize: 60,
    fontWeight: 'bold',
    color: colors.timerText,
  },
  permissionText: {
    color: colors.errorText,
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
    backgroundColor: colors.buttonBackground,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.buttonText,
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
    color: colors.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.buttonBackground,
    color: colors.buttonText,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '50%',
    marginBottom: 10,
  },
  setButton: {
    backgroundColor: colors.buttonBackground,
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
    color: colors.text,
    marginBottom: 10,
  },
  loudButton: {
    backgroundColor: '#FF9F1C',
  },
  quietButton: {
    backgroundColor: '#2EC4B6',
  },
  aboutButton: {
    backgroundColor: colors.buttonBackground,
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
    backgroundColor: 'white',
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
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
  },
  closeButton: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
});

export default styles;
