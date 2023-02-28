//https://github.com/mxsshao/versa-clockface
import clock from "clock"; 
import document from "document";
import { preferences } from "user-settings"; 
import { getDayName, getMonthName, monoDigits, numberWithCommas, getWeatherIcon } from "../common/utils"; // import user function zeroPad
import { HeartRateSensor } from "heart-rate"; 
import { BodyPresenceSensor } from "body-presence";
import { battery, charger } from "power"; 
import { vibration } from "haptics";
import { peerSocket } from "messaging";


// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the elements specified in the index.gui file
const label_battery = document.getElementById("label_battery");
const battery_base_1 = document.getElementById("battery_base_1");
const battery_base_2 = document.getElementById("battery_base_2");
const battery_1 = document.getElementById("battery_1");
const battery_2 = document.getElementById("battery_2");
const battery_3 = document.getElementById("battery_3");
const battery_4 = document.getElementById("battery_4");

const label_time = document.getElementById("label_time");
const label_seconds = document.getElementById("label_seconds");
const label_ampm = document.getElementById("label_ampm");
const label_date = document.getElementById("label_date");

const label_exercise = document.getElementById("label_exercise");
const label_nap = document.getElementById("label_nap");
const label_light = document.getElementById("label_light");
const progress_exercise = document.getElementById("progress_exercise");
const progress_nap = document.getElementById("progress_nap");
const progress_light = document.getElementById("progress_light");

const notification = document.getElementById("notification");

const line = document.getElementsByClassName("line");

let exercise_done = false;
let nap_done = false;
let light_done = false;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

peerSocket.onmessage = evt =>{
   let msg = evt.data;
  if(!msg.error)
    {
      if(msg.fields.workoutDone.booleanValue)
    {
      progress_exercise.style.fill="fb-green";
      exercise_done=true;
    }
    if(msg.fields.napDone.booleanValue)
      {
        progress_nap.style.fill="fb-green";
        nap_done=true;
      }
   if(msg.fields.lightTherapyDone.booleanValue)
     {
       progress_light.style.fill="fb-green";  
       light_done=true;
     }
    }
}

// Update handler each tick
clock.ontick = (evt) => {
    const now = evt.date; // get the actual instant
    let hours = now.getHours(); // separate the actual hours from the instant "now"
    console.log(hours); 
    let mins = now.getMinutes(); // separate the actual minute from the instant "now"
    console.log(mins);  
    let secs = now.getSeconds();
    console.log(secs);
    let day = now.getDay();
    let date = now.getDate();
    let month = now.getMonth();
  
  if(hours == 0 && mins == 0 && secs == 0)
    {
      console.log("midnight");
      progress_exercise.style.fill="fb-white";
      exercise_done=false;
      progress_nap.style.fill="fb-white";
      nap_done=false;
      progress_light.style.fill="fb-white";  
      light_done=false;
    }
  
   if(hours == 12 && mins == 0 && secs == 0)
    {
      console.log("time");
      if(!exercise_done)
        {
          vibration.start("ring");
        sleep(5000).then(() => { vibration.stop(); });
      notification.text = "Time to exercise";
        notification.style.fill = "fb-orange";
      notification.style.fontSize=30;
        }      
    }
  
  if(hours == 15 && mins == 0 && secs == 0)
    {
      console.log("time");
      if(!nap_done)
        {
          vibration.start("ring");
          sleep(5000).then(() => { vibration.stop(); });
          notification.text = "Time to nap";
          notification.style.fill = "fb-orange";
          notification.style.fontSize=30;
        }
    }
  
  if(hours == 18 && mins == 0 && secs == 0)
    {
      console.log("time");
      if(!light_done)
        {
          vibration.start("ring");
          sleep(5000).then(() => { vibration.stop(); });
          notification.text = "Time for light";
         notification.style.fill = "fb-orange";
          notification.style.fontSize=30;
        }
    }
    
    let ampm = "";

    // Check 12 or 24 hours
    if (preferences.clockDisplay === "12h") {
        if (hours > 12){
            ampm = "PM";
            hours -= 12;
        } else if (hours == 12){
            ampm = "PM"
        } else if (hours == 0) {
            ampm = "AM";
            hours += 12;
        } else {
            ampm = "AM";
        }
    }

    // Format numbers for display
    let disp_hours = monoDigits(hours);
    let disp_mins = monoDigits(mins);
    let disp_secs = monoDigits(secs);

    // Time in format hh:mm:ss
    label_time.text = `${disp_hours}:${disp_mins}`;
    label_seconds.text = `:${disp_secs}`;
    label_ampm.text = ampm;

    let disp_day = getDayName(day);
    let disp_month = getMonthName(month);
    label_date.text = `${disp_day} ${date} ${disp_month}`;
  
    // Battery Measurement
    let batt = Math.floor(battery.chargeLevel);
    let disp_batt = "";
    if (batt > 0) {
        disp_batt = monoDigits(batt, false) + "%";
    }
    label_battery.text = disp_batt;
    if (!charger.connected) {
        if (batt > 85) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "visible";
            battery_3.style.visibility = "visible";
            battery_4.style.visibility = "visible";
            battery_1.style.fill = "#a0a0a0";
            battery_2.style.fill = "#a0a0a0";
        } else if (batt > 60) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "visible";
            battery_3.style.visibility = "visible";
            battery_4.style.visibility = "hidden";
            battery_1.style.fill = "#a0a0a0";
            battery_2.style.fill = "#a0a0a0";
        } else if (batt > 35) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "visible";
            battery_3.style.visibility = "hidden";
            battery_4.style.visibility = "hidden";
            battery_1.style.fill = "#ccac28";
            battery_2.style.fill = "#ccac28";
        } else if (batt > 16) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "hidden";
            battery_3.style.visibility = "hidden";
            battery_4.style.visibility = "hidden";
            battery_1.style.fill = "#c63033";
        } else {
            battery_base_1.style.visibility = "hidden";
            battery_base_2.style.visibility = "hidden";
            battery_1.style.visibility = "hidden";
            battery_2.style.visibility = "hidden";
            battery_3.style.visibility = "hidden";
            battery_4.style.visibility = "hidden";
        }
    } else {
        battery_base_1.style.visibility = "hidden";
        battery_base_2.style.visibility = "hidden";
        battery_1.style.visibility = "hidden";
        battery_2.style.visibility = "hidden";
        battery_3.style.visibility = "hidden";
        battery_4.style.visibility = "hidden";
    }
}