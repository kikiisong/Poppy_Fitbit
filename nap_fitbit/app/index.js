/*
 * Entry point for the watch app
 */
// <a target="_blank" href="https://icons8.com/icon/Gjb8DPiIX3XW/sleep">Sleep</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
import { peerSocket } from "messaging";
import * as document from "document";
import clock from "clock";
import { vibration } from "haptics";
import { me as appbit } from "appbit";

appbit.appTimeoutEnabled = false;

clock.granularity = "seconds";

let start_time = new Date();
let expected_end = new Date();
let actual_end = new Date();

let time_selected = 5;
let select = document.getElementById("select");
let plus = document.getElementById("btn-plus");
let rating = document.getElementById("rating");
let vbad=document.getElementById("btn-vbad");
let bad=document.getElementById("btn-bad");
let ok=document.getElementById("btn-ok");
let good=document.getElementById("btn-good");
let vgood=document.getElementById("btn-vgood");
let next1=document.getElementById("next1");
let nextbtn=document.getElementById("nextbutton")
let done=document.getElementById("done");
let donebtn=document.getElementById("donebutton")

rating.style.visibility = "hidden";
next1.style.visibility = "hidden";
done.style.visibility = "hidden";

let btwarning = document.getElementById("btwarning");
let intwarning = document.getElementById("intwarning");
let retrybutton = document.getElementById("retrybutton");
let btretrybutton = document.getElementById("btretrybutton");
btwarning.style.visibility = "hidden";
intwarning.style.visibility = "hidden";

plus.onactivate = function(evt){
  if(time_selected < 60)
  {
    time_selected += 5;
    select.text = (time_selected + " min");
  }
}


let minus = document.getElementById("btn-minus");
minus.onactivate = function(evt){
  if(time_selected > 5)
  {
    time_selected -= 5;
    select.text = (time_selected + " min");
  }
}

let alarmbutton = document.getElementById("alarmbutton");
let stopbutton = document.getElementById("stopbutton");
let terminatebutton = document.getElementById("terminatebutton");

stopbutton.style.visibility = "hidden";
terminatebutton.style.visibility = "hidden";

let myClockTitle = document.getElementById("currTime");
let myClock = document.getElementById("myClock");
let remaining = document.getElementById("remainTime");
let remainTitle = document.getElementById("remain");
remaining.style.visibility = "hidden";
remainTitle.style.visibility = "hidden";
clock.ontick = function(evt) {
          myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                      ("0" + evt.date.getSeconds()).slice(-2);
          };

function back(user_rating) {
  rating.style.visibility = "hidden";
  done.style.visibility = "visible";
  
  let msg = {
    fields:{
      start: {
        stringValue: start_time
      },
       expected:{
         stringValue: expected_end
       },
        end: {
          stringValue: actual_end
        },
        rating:{
          stringValue: user_rating
        }
    }
        
      };
  
  if(peerSocket.readyState == peerSocket.OPEN)
    {
      peerSocket.send(msg);
    }
  
}

function rate(){
  next1.style.visibility = "hidden";
  rating.style.visibility = "visible";
}

function next(){
  vibration.stop();
  next1.style.visibility = "visible";
  clock.ontick = function(evt){};
  myClockTitle.style.visibility = "hidden";
  myClock.style.visibility = "hidden";
  remaining.style.visibility = "hidden";
  remainTitle.style.visibility = "hidden";
  stopbutton.style.visibility = "hidden";
  terminatebutton.style.visibility = "hidden";
  actual_end = new Date().toString();
}

function backToInit(){
   done.style.visibility = "hidden";
  stopbutton.style.visibility = "hidden";
  terminatebutton.style.visibility = "hidden";
  remaining.style.visibility = "hidden";
  remainTitle.style.visibility = "hidden";
  alarmbutton.style.visibility = "visible";
    select.style.visibility = "visible";
   plus.style.visibility = "visible";
   minus.style.visibility = "visible";
   myClockTitle.style.visibility = "visible";
  myClock.style.visibility = "visible";
  clock.ontick = function(evt) {
          myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                      ("0" + evt.date.getSeconds()).slice(-2);
          };
}

stopbutton.onactivate = next;

terminatebutton.onactivate = next;

nextbtn.onactivate = rate;
donebtn.onactivate = backToInit;

vbad.onactivate = function(evt){
    back("very_bad");
  }

bad.onactivate = function(evt){
    back("bad");
  }

ok.onactivate = function(evt){
    back("ok");
  }

good.onactivate = function(evt){
    back("good");
  }

vgood.onactivate = function(evt){
    back("very_good");
  }
  
retrybutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: true,
          };  
          intwarning.style.visibility="visible";
          myClockTitle.style.visibility = "hidden";
          myClock.style.visibility = "hidden";
          peerSocket.send(msg);
        }
  else
    {
      select.style.visibility="hidden";
      btwarning.style.visibility = "visible";
      myClockTitle.style.visibility = "hidden";
          myClock.style.visibility = "hidden";
    }
}

btretrybutton.onactivate = function(evt){
  if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: true,
          };
          intwarning.style.visibility="visible";
          select.style.visibility="hidden";
           plus.style.visibility = "hidden";
      minus.style.visibility = "hidden";
          myClockTitle.style.visibility = "hidden";
          myClock.style.visibility = "hidden";
          peerSocket.send(msg);
        }
  else
    {
      btwarning.style.visibility = "visible";
      select.style.visibility="hidden";
       plus.style.visibility = "hidden";
      minus.style.visibility = "hidden";
      myClockTitle.style.visibility = "hidden";
          myClock.style.visibility = "hidden";
    }
}

 alarmbutton.onactivate = function(evt){
    console.log("Alarm Clicked");
    alarmbutton.style.visibility = "hidden";
    if(peerSocket.readyState == peerSocket.OPEN)
        {
          let msg = {
            checkConn: true,
          };
          intwarning.style.visibility="visible";
          select.style.visibility = "hidden";
          plus.style.visibility = "hidden";
          minus.style.visibility = "hidden";
          myClockTitle.style.visibility = "hidden";
          myClock.style.visibility = "hidden";
          peerSocket.send(msg);
        }
  else
    {
      btwarning.style.visibility = "visible";
      select.style.visibility="hidden";
    plus.style.visibility = "hidden";
      minus.style.visibility = "hidden";
      myClockTitle.style.visibility = "hidden";
          myClock.style.visibility = "hidden";
    }
 }


peerSocket.onmessage = evt =>{
  let msg = evt.data; 
  console.log(JSON.stringify(msg));
  
  if(msg.conn)
    {   
      intwarning.style.visibility="hidden";
      btwarning.style.visibility="hidden";
      
      myClockTitle.style.visibility = "visible";
      myClock.style.visibility = "visible";
      terminatebutton.style.visibility = "visible";
      select.style.visibility = "hidden";
      plus.style.visibility = "hidden";
      minus.style.visibility = "hidden";
      remaining.style.visibility = "visible";
       remainTitle.style.visibility = "visible";
   
      let start_time_raw = new Date();
      start_time = start_time_raw.toString();
      let target = start_time_raw.getTime()+time_selected*60000;
      let target_date = new Date(target);
      expected_end = target_date.toString();
      remaining.text = ("0" + target_date.getHours()).slice(-2) + ":" +
                          ("0" + target_date.getMinutes()).slice(-2) + ":" +
                          ("0" + target_date.getSeconds()).slice(-2);
      clock.ontick = function(evt) {
                  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                          ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                          ("0" + evt.date.getSeconds()).slice(-2);
                  if(evt.date.getTime()>target_date.getTime())
                    {
                      console.log("It's time!");
                      vibration.start("ring");
                      terminatebutton.style.visibility = "hidden";
                      stopbutton.style.visibility = "visible";
                      clock.ontick = function(evt) {
                      myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                                  ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                                  ("0" + evt.date.getSeconds()).slice(-2);
                      };   
                    }
             } 
      }
}