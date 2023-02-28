/*
 * Entry point for the companion app
 */
import { peerSocket } from "messaging";
console.log("Companion code started");

function updateProgress()
{
  let curr_date = new Date();
   let date_str = curr_date.toDateString();
  
  let post_url = '';//https://[your server url]
  fetch(post_url)
    .then(response => response.json())
    .then(data => 
      {
            console.log("old_general", data);
            {
              if(peerSocket.readyState == peerSocket.OPEN)
                {
                   peerSocket.send(data);
                }
            }
  })
    .catch((error)=>{
    console.log(error);
  })
}
                    
setInterval(function(){
    updateProgress();
    console.log("Interval passed");
}, 1800000)

