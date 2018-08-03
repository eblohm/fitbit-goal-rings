import document from "document";
import clock from "clock";
import userActivity from "user-activity";
import { display } from "display";
import { preferences } from "user-settings";
import * as battery from "battery";
import * as util from "../common/utils";

// Set up all necessary variables
let clockHours    = document.getElementById("clockHours");
let clockMinutes  = document.getElementById("clockMinutes");
clock.granularity = "seconds";

let date          = document.getElementById("date");
let currentDay    = "";
let monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug","Sep", "Oct", "Nov", "Dec" ];
let dataTypes = [ "steps", "distance", "calories",
                  "elevationGain", "activeMinutes" ];
let dataProgress = [];


let getCurrentDataProgress = function(dataType) {
  let dataContainer = document.getElementById(dataType);
  return {
    dataType: dataType,
    dataContainer: dataContainer,
    arcBack: dataContainer.getElementById("arcBack"),
    arcFront: dataContainer.getElementById("arcFront"),
    dataCount: dataContainer.getElementById("dataCount"),
    dataIcon: dataContainer.getElementById("dataIcon"),
  }
}

for(var i=0; i < dataTypes.length; i++) {
  var currentData = dataTypes[i];
  dataProgress.push(getCurrentDataProgress(currentData));
}

// Refresh data, all other logic is in separate files
function refreshData(type) {
  let currentType = type.dataType;
  
  let currentDataProg = (userActivity.today.adjusted[currentType] || 0);
  let currentDataGoal = userActivity.goals[currentType];
  
  let currentDataArc = (currentDataProg / currentDataGoal) * 360;
  
  if (currentDataArc > 360) {
    currentDataArc = 360;
  }
  
  if(currentType==="distance") {
    currentDataProg = (currentDataProg * 0.000621371192).toFixed(2);
  }
  
  type.arcFront.sweepAngle = currentDataArc;
  type.dataCount.text = currentDataProg;
}

function refreshAllData() {
  for(var i=0; i<dataTypes.length; i++) {
    refreshData(dataProgress[i]);
  }
}

clock.ontick = evt => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = util.zeroPad(hours % 12 || 12);
  } else {
    hours = util.zeroPad(hours);
  }
  let mins          = util.zeroPad(today.getMinutes());
  clockHours.text   = hours;
  clockMinutes.text = mins;
  
  let year = today.getFullYear();
  let monthNum = today.getMonth();
  let month    = monthArray[monthNum];
  let day      = today.getDate();
  
  date.text = month + ' ' + day;
  
  currentDay = year + "-" + util.zeroPad(monthNum+1) + "-" + day;
  
  battery.setLevel();
  
  refreshAllData();
}
