function sendToSlack(url,payload) {
   var options =  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload)
  };
  return UrlFetchApp.fetch(url, options);
}

function slackMessage() {
  var slackURL = "https://hooks.slack.com/services/" //add your Slack webhook URL here
  
  //Do Stuff if you want a conditional message
  
  var payload = {
    "channel": "#channelName",
    "username": "name of bot",
    "text": "message you want to send to Slack <https://google.com|This is a hyperlink>",
    "icon_emoji" : ":nameofEmoji:"
  };
  sendToSlack(slackURL,payload);
}
