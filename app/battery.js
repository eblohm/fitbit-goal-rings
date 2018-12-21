import document from "document";
import { battery, charger } from "power";

const batData = document.getElementById("batteryLevel");
const batIcon = document.getElementById("batteryIcon");

function batteryLevelColor(percentage) {
  let batColor = '';
  if(percentage <= 10) {
    batColor = 'fb-red';
  } else if (percentage <= 30) {
    batColor = 'fb-peach';
  } else {
    batColor = 'fb-green';
  }
  return batColor;
}

export function setLevel() {
  batData.width = Math.round(battery.chargeLevel * 26 / 100);
  batData.style.fill = batteryLevelColor(Math.round(battery.changeLevel));
  batIcon.style.visibility = battery.charging || charger.connected ? "hidden" : "visible";
}
