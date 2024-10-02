import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Add padding to the container
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
    marginBottom: 30, // Increase bottom margin
  },
  permissionText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 20, // Add bottom margin
    textAlign: 'center', // Center the text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%', // Increase width for more spacing
  },
  button: {
    minWidth: 80, // Set a minimum width for buttons
    marginHorizontal: 5, // Add horizontal margin between buttons
  }
});

export default styles;
