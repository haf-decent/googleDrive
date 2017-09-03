function getUserInput() {
  var UI = SpreadsheetApp.getUi();
  var buttonOptions = [UI.ButtonSet.OK, UI.ButtonSet.OK_CANCEL, UI.ButtonSet.YES_NO, UI.ButtonSet.YES_NO_CANCEL];
  var title = "User Input Needed";
  
  //Alert user for simple "OK,Yes,No,Cancel" input
  var question1 = "Question that has a Yes/No answer";
  var response1 = UI.alert(title, question1, buttonOptions[3]);
  if (response1 == UI.Button.YES) {
    //do stuff
  }
  else {} //do other stuff
  
  //Prompt for custom user input
  var question2 = "This is a more custom question I need answered to continue whatever I'm doing, like 'What is your name?'";
  var response2 = UI.prompt(title, question2).getResponseText;
  //use response2 for whatever
}
