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
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.timerText,
  },
  timeDisplay: {
    fontSize: 48,  
    fontWeight: 'bold',
    textAlign: 'center',  
    marginBottom: 30,
    color: colors.text,
  },
  permissionText: {
    color: colors.errorText,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  button: {
    minWidth: 80,
    marginHorizontal: 5,
    backgroundColor: colors.buttonBackground,
  },
  buttonText: {
    color: colors.buttonText,
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.timerText,
  },
  timerText: {
    fontSize: 55,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.timerText,
  },
  timeDisplay: {
    fontSize: 70,  
    fontWeight: 'bold',
    textAlign: 'center',  
    marginBottom: 30,
    color: colors.text,
  },
  permissionText: {
    color: colors.errorText,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  buttonContainer2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    position: "absolute",
    top: 10,
    left: 10,
    width: '30%',
  },
  button: {
    minWidth:100,
    maxWidth:300,
    minHeight:50,
    maxHeight:150,
    marginHorizontal: 5,
    backgroundColor: colors.buttonBackground,
  },
  setterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 5,
    width: '35%',
  },
  input:{
    color: colors.text

  },
  buttonText: {
    color: colors.buttonText,
  },
});

export default styles2;
