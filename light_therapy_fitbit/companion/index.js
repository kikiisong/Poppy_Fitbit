/*
 * Entry point for the companion app
 */

import { peerSocket } from "messaging";
console.log("Companion code started");

peerSocket.onmessage = evt =>{
  let msg = evt.data;
  
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
        else
          {
              let curr_date = new Date();
              let date_str = curr_date.toDateString();
              let time_str = curr_date.toString();
              let lighturl = ''/*https://[your server url]*/ + date_str + '?documentId=light_' + time_str ;

              fetch(lighturl, {
                      method: 'POST', 
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(msg) // body data type must match "Content-Type" header
               })
               .then(response => response.json())
               .then(data => console.log("posted", data));


                let post_url = ''/*https://[your server url]*/ + date_str + '/general';
                fetch(post_url)
                 .then(response => response.json())
                 .then(data => 
                  {
                        console.log("old_general", data);
                        data.fields.lightTherapyDone.booleanValue = true;

                        fetch(post_url, {
                      method: 'PATCH', 
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data) // body data type must match "Content-Type" header
                    })
                    .then(response => response.json())
                    .then(data => console.log("new_general", data));
                  }
                 )
       }
}
      
  


