import { me } from "appbit";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";

let hrm, checkInterval;

let heartText = document.getElementById("hrm-data");

export function initialize() {
  if (me.permissions.granted("access_heart_rate")) {
    hrm = new HeartRateSensor();
    heartRateSetup();
    startReading();
  } else {
    console.log("Heart Rate Permission was denied.");
    heartText.text = "N/A";
  }
}

function getReading() {
  heartText.text = hrm.heartRate ? hrm.heartRate : 0;
}

function heartRateSetup() {
  display.addEventListener("change", function() {
    if (display.on) {
      startReading();
    } else {
      stopReading();
    }
  });
}

function startReading() {
  if (!checkInterval) {
    hrm.start();
    getReading();
    checkInterval = setInterval(getReading, 1000);
  }
}

function stopReading() {
  hrm.stop();
  clearInterval(checkInterval);
  checkInterval = null;
}
