# timerapp
## 20/20/20 Vision

Created by Isaac Kisker, Jessica Cunliffe, Lila Schisgal, Minghan Fan for COMP 225

### What is this?

Our project runs using the React Native framework. To run our program locally, you should install our repository on your computer. On a Mac you need to install Homebrew, and on a Windows you need to have Chocolatey or Winget. You will use these to install the necessary packages, running brew/choco install node and brew/choco install watchman. Once these are installed, you can open the program through terminal by running npm start in the proper directory. This will take you to a series of options: w for launching the program on the web, a for android, or i for ios. All of these are supported by our program.

Our program is run by the App.js file, which runs the timer, builds the app, and calls all the rest of the code. Notifications are called from Notifications.js, which then checks the operating system and passes the calls onto specific notification.s files whatever platform the program is running on. The special features of the progress tree and language module have their own files as well, which are accessed through App.js.

Once in our App, you can engage in several ways to customize your experience. If for some reason you need a time interval greater or less than 20 you can customize through the set duration button. There is a settings button which allows you to choose a color theme of your liking from a series of preset options. There are also buttons with options for each of our available languages: English, Spanish, and Mandarin. To see the progress tree, the user can click the leaf button.

### Acknowledgements

Thank you to:
- https://www.flaticon.com/free-icon/witness_2210317?term=eye&related_id=2210317
- https://freesound.org/people/FoolBoyMedia/sounds/352650/
- https://docs.expo.dev/distribution/publishing-websites/
- https://docs.expo.dev/tutorial/create-your-first-app/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
- https://docs.expo.dev/versions/latest/sdk/notifications/#
- https://docs.expo.dev/build-reference/simulators/
