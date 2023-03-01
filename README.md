# Poppy_Fitbit

## Overview
A Fitbit (smartwatch) application as a part of an assistive robotic system, which:
1. measures and communicates biometric data to the robot
2. allows remote control of the system
3. monitors activity progress and sends reminder to the user.

Fitbit Device: Versa 2

Fitbit SDK Version: 4.2

## Firebase Server
A intermediate server/database is needed to facilitate the communication between Fitbit and the robot system.  
1. [Set up and deploy a firebase server.](https://firebase.google.com/docs/hosting/quickstart)
2. Use npm to install express and other JavaScript packages.

You can use firebase/index.js as a reference.

## How to Run Each Fitbit App/Clockface
There are 4 projects: exercise, light therapy, nap, and clockface.
1. Create an empty project in [Fitbit Studio](https://studio.fitbit.com).
2. Copy/upload all the folders and files into the project. 
3. Run from the studio.

## Exercise App
It can:
- Send commands to a server if a button is clicked. This is for remote control.
- Send heartrate to a server.

## Nap App or Light Therapy App
It can:
- Set a timer with silent alarm.
- Send time information to a server.
- Send activity status (Done = true) to a server.

## Clockface
Thanks to [mxxshao's repo](https://github.com/mxsshao/versa-clockface) for the template.
It can:
- Read activiy status from a server regularly.
- Remind user of an activity with text and vibration.

![clockface](pictures/clockface1.png)
