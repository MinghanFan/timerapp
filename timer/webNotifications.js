import { getTranslation } from "./language"; // Import the translation function

// Function to initialize notifications and request permissions for web
export const initializeWebNotifications = async () => {
  try {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      alert(getTranslation("en", "unsupportedBrowser")); // Default to English
      return false;
    }

    // Check if the user has already granted permission for notifications
    if (Notification.permission === "granted") {
      return true;
    }

    // If permission is not denied, request permission
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        return true;
      }
    }

    // If permission is denied or not granted, alert the user
    alert(getTranslation("en", "permissionWarning")); // Default to English
    return false;
  } catch (error) {
    console.error("Error initializing web notifications:", error);
    return false;
  }
};

// Function to send a web notification
export const sendWebNotification = (message, language) => {
  try {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: getTranslation(language, "lookAway"), // Dynamic body text
        tag: "timer-alert",
        icon: "https://i.pinimg.com/736x/55/c3/97/55c39703ef11466669e8c734030bd7f9.jpg",
      });
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message, {
            body: getTranslation(language, "lookAway"), // Dynamic body text
          });
        }
      });
    }
  } catch (error) {
    console.error("Error sending web notification:", error);
  }
};

// Function to send a web after-notification
export const sendWebAfterNotification = (message, language) => {
  try {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: getTranslation(language, "goodToGo"), // Dynamic after-notification body text
        tag: "timer-alert",
        icon: "https://i.pinimg.com/736x/55/c3/97/55c39703ef11466669e8c734030bd7f9.jpg",
      });
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message, {
            body: getTranslation(language, "goodToGo"), // Dynamic after-notification body text
          });
        }
      });
    }
  } catch (error) {
    console.error("Error sending web after-notification:", error);
  }
};

// Function to send a noisy web notification
export const sendWebNotificationNoisy = (message, language) => {
  try {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: getTranslation(language, "lookAway"), // Dynamic body text
        icon: "https://drive.google.com/file/d/1ljG37NbC6Sr_GtmtTn1NVtiDGBmslkwK/view?usp=sharing",
      });
      const audio = new Audio("352650__foolboymedia__piano-notification-4.mp3");
      audio.play().catch((audioError) => {
        console.error("Error playing audio:", audioError);
      });
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message, {
            body: getTranslation(language, "lookAway"), // Dynamic body text
            icon: "https://drive.google.com/file/d/1ljG37NbC6Sr_GtmtTn1NVtiDGBmslkwK/view?usp=sharing",
          });
          const audio = new Audio("352650__foolboymedia__piano-notification-4.mp3");
          audio.play().catch((audioError) => {
            console.error("Error playing audio:", audioError);
          });
        }
      });
    }
  } catch (error) {
    console.error("Error sending noisy web notification:", error);
  }
};
