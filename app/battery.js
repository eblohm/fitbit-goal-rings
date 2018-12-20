import document from "document";
import { battery } from "power";

const batData = document.getElementById("batteryLevel");

function batteryLevelColor(percentage) {
  if(percentage <= 10) {
    return 'fb-red';
  } else if (percentage <= 30) {
    return 'fb-peach';
  }
  return 'fb-green';
}

export function setLevel() {
  batData.width = Math.round(battery.chargeLevel * 26 / 100);
  batData.style.fill = batteryLevelColor(Math.round(battery.chargeLevel));
}
