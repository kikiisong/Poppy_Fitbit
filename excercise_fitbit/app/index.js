/*
 * Entry point for the watch app
 */
// <a target="_blank" href="https://icons8.com/icon/uP1ssU9GbpsV/exercise">Exercise</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
import { HeartRateSensor} from "heart-rate";
import * as document from "document";
import { peerSocket } from "messaging";

let tutbutton = document.getElementById("tutbutton");
tutbutton.style.visibility = "hidden";
let pausebutton = document.getElementById("pausebutton");
pausebutton.style.visibility = "hidden";
let startbutton = document.getElementById("startbutton");
startbutton.style.visibility = "hidden";
let myhr = document.getElementById("myhr");
let sessionbutton = document.getElementById("sessbutton");
let btwarning = document.getElementById("btwarning");
let intwarning = document.getElementById("intwarning");
let retrybutton = document.getElementById("retrybutton");
let btretrybutton = document.getElementById("btretrybutton");
let hrSec = document.getElementById("hr");
btwarning.style.visibility = "hidden";
intwarning.style.visibility = "hidden";

retrybutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: true,
          };
          sessionbutton.style.visibility = "hidden";  
          intwarning.style.visibility="visible";
          hrSec.style.visibility = "hidden";
          peerSocket.send(msg);
        }
  else
    {
      sessionbutton.style.visibility = "hidden";
      btwarning.style.visibility = "visible";
      hrSec.style.visibility = "hidden";
    }
}

btretrybutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: true,
          };
          sessionbutton.style.visibility = "hidden";  
          intwarning.style.visibility="visible";
          hrSec.style.visibility = "hidden";
          peerSocket.send(msg);
        }
  else
    {
      sessionbutton.style.visibility = "hidden";
      btwarning.style.visibility = "visible";
      hrSec.style.visibility = "hidden";
    }
}

sessionbutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: true,
          };
          sessionbutton.style.visibility = "hidden";  
          intwarning.style.visibility="visible";
          hrSec.style.visibility = "hidden";
          peerSocket.send(msg);
        }
  else
    {
      sessionbutton.style.visibility = "hidden";
      btwarning.style.visibility = "visible";
      hrSec.style.visibility = "hidden";
    }
}

peerSocket.onmessage = evt =>{
  let msg = evt.data; 
  console.log(JSON.stringify(msg));
  
  if(msg.conn)
    {
      intwarning.style.visibility="hidden";
      hrSec.style.visibility = "visible";
      
      tutbutton.style.visibility = "visible";
      startbutton.style.visibility = "visible";
      if (HeartRateSensor)
  {
    const hrm = new HeartRateSensor( {frequency: 1 });
    hrm.addEventListener("reading", () =>{
        let msg = {
          checkConn: false,
          isCommand: false,
          heartrate: hrm.heartRate
        }
        console.log(msg);
        if(peerSocket.readyState == peerSocket.OPEN)
        {
          btwarning.style.visibility = "hidden";
           hrSec.style.visibility = "visible"; 
          myhr.text = msg.heartrate;
          peerSocket.send(msg);
        }
      else
        {
          myhr.text = "no bluetooth";
        }
    })
       
    hrm.start();
  }
    }
}

tutbutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: false,
            isCommand: true,
            command: "play_tutorial" 
          };
          peerSocket.send(msg);
          tutbutton.style.visibility = "hidden";
          pausebutton.style.visibility = "visible"; 
        }
}

pausebutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: false,
            isCommand: true,
            command: "pause_tutorial" 
          };
          peerSocket.send(msg);
          tutbutton.style.visibility = "visible";
          pausebutton.style.visibility = "hidden"; 
        }
}


startbutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: false,
            isCommand: true,
            command: "start_recording"
          };
          peerSocket.send(msg);
        }
}
