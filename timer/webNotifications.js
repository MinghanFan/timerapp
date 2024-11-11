// Function to initialize notifications and request permissions for web
export const initializeWebNotifications = async () => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
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
    alert("Permission for notifications was not granted.");
    return false;
  };
  
  // Function to send a web notification
  export const sendWebNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification(message, {
      body: "Look away!",
      tag: "timer-alert",
      icon: "https://i.pinimg.com/736x/55/c3/97/55c39703ef11466669e8c734030bd7f9.jpg" 
    });
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  }

  export const sendWebAfterNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification(message, {
      body: "You're good to go!",
      tag: "timer-alert",
      icon: "https://i.pinimg.com/736x/55/c3/97/55c39703ef11466669e8c734030bd7f9.jpg" 
    });
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  }
  
  // Function to send a noisy web notification
  export const sendWebNotificationNoisy = (message) => {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: "Look away!",
        icon: "https://i.pinimg.com/736x/55/c3/97/55c39703ef11466669e8c734030bd7f9.jpg" 
        });
      const audio = new Audio("harp_lightcurve-[AudioTrimmer.com].mp3");
      audio.play();
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(message, {
            body: "Look away!",
            icon: "https://i.pinimg.com/736x/55/c3/97/55c39703ef11466669e8c734030bd7f9.jpg" 
          });
          const audio = new Audio("harp_lightcurve-[AudioTrimmer.com].mp3");
          audio.play();
        }
      });
    }
  };
  