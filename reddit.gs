//This script crawls subreddits and logs each post to a spreadsheet
//Could be used for setting up custom alerts, analyzing posting behavior, etc.

/*Each sheet of the Spreadsheet is named a different subreddit "r/____" 
This goes through each of them and runs the crawler to populate sheet with new posts
Note: the loop starts at 1 (the second sheet) because I have a frontpage that explains what the spreadsheet is
if you just have a spreadsheet full of subreddits, change "var i = 1" to "var i = 0"*/
function updateAll() {
  var sheets = SpreadsheetApp.getActive().getSheets();
  for (var i = 1; i < sheets.length; i++) {
    var sheet = sheets[i];
    scrapeReddit(sheet, 5);
  }
}

//This function actually pulls the info from Reddit and logs it to the sheet
function scrapeReddit(sheet, posts) {
  var REDDIT = sheet.getName();
  if (!(REDDIT.indexOf("r/") == 0)) {
    Logger.log("Incorrect sheet name format. Please rename " + REDDIT + " using the r/subreddit format.");
    return; //if the sheet isn't named correctly, it logs the error and returns
  }
  posts = posts || 50;
  var url = "http://www.reddit.com/" + REDDIT + "/new.json?limit=" + posts;
  var success = false;
  for (var tries = 0; tries < 5; tries++) { //try 5 times to reach the server
    if (!success) {
      try {
        var response = UrlFetchApp.fetch(url); //if it fails here, success remains false
        success = true;
      }
      catch(err) {
        Logger.log(err);
        Utilities.sleep(5000);
      }
    }
    else {break;}
  }
  if (!success) {
    Logger.log("Reddit server was unresponsive. Try again later");
    return; //if the server didn't respond, exit function
  }
  var doc = JSON.parse(response.getContentText()); //otherwise parse the response
  var entries = doc.data.children;
  var checks = sheet.getRange(2, 4, posts, 1).getDisplayValues(); //check new entries against old ones so there are no repeats
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i].data;
    var date = Utilities.formatDate(new Date(), "America/Los_Angeles", "yyyy-MM-dd");
    var title = entry.title;
    var link = entry.permalink;
    for (var check = 0; check < checks.length; check++) {
      if (checks[check] == title) {
        var no = true; //if the title matches a recent entry, don't add it to the sheet
        break;
      }
    }
    if (!no) {
      sheet.insertRowBefore(2); //add new row to top of sheet (below headers)
      var count = sheet.getRange("A3").getValue() + 1;
      var data = [count, date, 0, title];
      sheet.getRange("A2:D2").setValues([data]);
      sheet.getRange("C2").setFormula("=hyperlink(\"http://www.reddit.com/"+ link +"\",\"link\")"); //add hyperlink to link column
    }
  }
}

//function for automatically adding a new sheet for a new subreddit
//The other option is to just add and name a new sheet manually, which works too
function newSub() {
  var newSub = SpreadsheetApp.getUi().prompt("Type in name of subreddit you want to add [r/subreddit].\nType \"x\" to exit.").getResponseText();
  if (newSub == "x" || newSub == "") {return;} //if they don't want to add one, exit
  if (!(newSub.indexOf("r/") == 0)) {
    Logger.log("Incorrect sheet name format. Please try again using the r/subreddit format. Your entry: " + newSub);
    return; //if it's not named correctly ask them to retry
  }
  var newAmt = SpreadsheetApp.getUi().prompt("How many posts would you like to fetch, initially (min 1, max 100)").getResponseText();
  var posts = parseInt(newAmt);
  if (posts < 1 || posts > 100 || isNaN(posts)) {
    Logger.log("Bad input value for initial posts to load: " + newAmt + ". Please try again with an integer value between 1 and 100. Aborting...");
    return; //if the user inputs a bad value, exit and ask them to try again
  }
  var s = SpreadsheetApp.getActive();
  var sheets = s.getSheets();
  s.insertSheet(newSub, sheets.length); //insert new sheet at end
  var sheet = s.getSheetByName(newSub);
  scrapeReddit(sheet, posts); //initialize the sheet with user defined number of initial posts to crawl
}

//add functions to menu
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Update All Subs",
    functionName : "updateAll"
  },{
    name : "Add new Sub",
    functionName : "newSub"
  }];
  sheet.addMenu("Scripts", entries);
}
