/*
This file is a non-functional list of the important methods included in Google Scripts.
It's meant to be a general reference for developing your own scripts. The other files
included in this repository are more specific to accomplishing tasks, so feel free to 
explore.
*/

function learnStuff() {
  //Libraries
  var libraries = [
    SpreadsheetApp,
    DocumentApp,
    ScriptApp,
    DriveApp,
    UrlFetchApp,
    Utilities,
    GmailApp
  ];
  //Assuming the autocomplete function is on (Edit > Word Completion), 
  //you can type a period "." next to any of those to see their methods
  
  //1. Important SpreadsheetApp methods
  var spreadsheet = SpreadsheetApp.getActive() || SpreadsheetApp.getActiveSpreadsheet();
  var sheetTabinSpreadsheet = SpreadsheetApp.getActiveSheet();
  //You have to select the spreadsheet or sheet you want to edit
  var information = {
    "name": spreadsheet.getName(),
    "ID": spreadsheet.getId(), //ID is useful for opening multiple or conditionally determined Spreadsheets
    "URL": spreadsheet.getUrl()
  };
  
  var data = {
    "rangeofColsandRows": {
      "getRange": spreadsheet.getRange(rowStart, colStart, numRows, numCols),
      "dataofRange": {
        "get": spreadsheet.getRange().getValue() || spreadsheet.getRange().getValues(),
        "set": spreadsheet.getRange().setValue() || spreadsheet.getRange().setValues(),
        "delete": spreadsheet.getRange().clear(),
        "formulaofRange": spreadsheet.getRange().getFormula() || spreadsheet.getRange().setFormula()
      }
    },
    "indexofLastRoworColumnwithData": spreadsheet.getLastRow() || spreadsheet.getLastColumn(),
    "insertRoworColumn": spreadsheet.insertRowBefore(beforePosition) || spreadsheet.insertColumnBefore(beforePosition),
  };
  
  var UI = {
    "ui": SpreadsheetApp.getUi(),
    "addsubMenutoMenutoolbar": SpreadsheetApp.getActive().addMenu(name, subMenus) || SpreadsheetApp.getUi().createMenu(name).addItem(caption, functionName).addToUi(),
    "promptUserInput": SpreadsheetApp.getUi().prompt(title, prompt, buttons)
  };
  
  //2. Important DocumentApp methods
  var doc = DocumentApp.openByUrl(url) || DocumentApp.openById(id) || DocumentApp.getActiveDocument();
  var text = doc.getBody().getParagraphs()[0].getText();
  //DocumentApp UI methods are the same as Spreadsheet UI methods 
  
  //3. Important ScriptApp methods
  ScriptApp.newTrigger(functionName) //Triggers run programs at specific times
  
  //4. Important DriveApp methods
  var organization = {
    "file": DriveApp.addFile(child),
    "folder": DriveApp.addFolder(child),
    "searchforSpecificFile": DriveApp.getFilesByName(name).next() 
    //the .next() method is used to iterate through the array of returned files even if there's only one
    //you can use this method to find a file's url or ID for easier handling of multiple or conditional files
  }
  
  //5. Important UrlFetchApp methods
  var request = UrlFetchApp.fetch(url); //send a get request to specified url
  var json = JSON.parse(request.getContentText()); //parse the response into a useable JSON object
  
  //6. Important Utilities methods
  //Date Formatting
  var date = new Date(); //creates a date
  Utilities.formatDate(date, timeZone, format); //formats it like June 18, 2017, 23:35PM or like 6/18 11:35 for example
  
  //Computer sleep
  Utilities.sleep(milliseconds);
  
  //7. Important GmailApp methods
  var start = 0,
      max = GmailApp.getInboxUnreadCount();
  var threads = GmailApp.getInboxThreads(start, max); //gets an Array of unread threads
  var messageTextinThread = threads[0].getMessages()[0].getPlainBody();
  
  var emailMethods = {
    "replytoEmail": threads[0].reply(body),
    "movetoTrash": threads[0].moveToTrash()
  };
  
  //8. Other Important Stuff
  var userEmail = Session.getActiveUser().getEmail();
  /*
  function onEdit() {
    //do stuff
  };
  function onOpen() {
    //do stuff
  };
  */
  //These functions are specially named functions that essentially create Triggers. 
  //Good for adding menus when the Sheet or Doc is opened
  
  Logger.log("You can open the execution logs by hitting Command+Enter. Logger.log basically prints messages to the console, which is helpful for debugging.");
  Logger.log(variable); //Prints the value of a variable
}
