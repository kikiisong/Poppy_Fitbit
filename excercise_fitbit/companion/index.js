/*
 * Entry point for the companion app
 */

import { peerSocket } from "messaging";
console.log("Companion code started");

peerSocket.onmessage = evt =>{
  let msg = evt.data; 
  console.log(JSON.stringify(msg));
 
  if(msg.checkConn)
    {
      fetch('https://www.google.com')
        .then(response => {
          if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
            if(peerSocket.readyState == peerSocket.OPEN)
            {
              let msg = {
                conn: false,
              };
              peerSocket.send(msg);
            }
          }
        else
          {
            let msg = {
                conn: true,
              };
              peerSocket.send(msg);
          }

        })
    }
  else if(msg.isCommand)
    {
      let url = ''; //https://[your server url]
      let command = {command: msg.command};
       fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(command) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(data => console.log(data));
    }
  else
    {
      let url =  ''; //https://[your server url]
      let hr = {heartrate: msg.heartrate};
      fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hr) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => console.log(data));
    }

}