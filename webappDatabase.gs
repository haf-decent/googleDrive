// This script turns a Spreadsheet into a database for a web application

//Global variables for quick updating
var sheetURL = "https://docs.google.com/spreadsheets/d"; //add your spreadsheet url here
var sheetName = ""; //add the name of the tab where the values should be logged

//POST function for xmlhttp requests
function doPost(e) {
  return handleResponse(e);
}

//Actual handling of requests
function handleResponse(e) {
  var lock = LockService.getPublicLock(); //prevent multiple requests trying to edit the spreadsheet concurrently
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
  
  try {
    var ss = SpreadsheetApp.openByUrl(sheetURL);
    var sheet = ss.getSheetByName(sheetName);
    
    var vals = [Utilities.formatDate(new Date(), "America/New_York", "MM/dd/YYYY, HH:mm")]; //create timestamp
    var inputs = JSON.parse(e.postData.contents); //get info passed by request
    
    //log object data on spreadsheet
    
    // return json success results with timestamp
    return ContentService.createTextOutput(JSON.stringify({"result":"success", "time": vals[0]}))
          .setMimeType(ContentService.MimeType.JSON);
  } 
  catch(e) {
    // if error return this
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } 
  finally {lock.releaseLock();}
}
