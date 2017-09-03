function f1() {

  //Do stuff

}

function f2() {

  //Do stuff

}

function f3() {

  //Do stuff

}

function onOpen() {
  DocumentApp.getUi().createMenu("name of Menu") //DocumentApp or SpreadsheetApp, adds a "name of Menu" tab to the toolbar
    .addItem("Option 1", "f1")
    .addItem("Option 2", "f2")
    .addItem("Option 3", "f3") //each of these adds an option to the menu we created above that corresponds to a function
  .addToUi();
}
