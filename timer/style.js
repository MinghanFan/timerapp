import { StyleSheet } from 'react-native';

// Color variables 
const colors = {
  background: '#799191',
  text: '#000',
  timerText: '#000',
  buttonBackground: '#C8D3C4',
  buttonText: '#fff',
  errorText: 'red',
};

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

export default styles;
