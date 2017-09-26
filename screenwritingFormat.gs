//This file turns a Google Doc into a correctly formatted screenplay
//I might try to turn it into an add-on that formats in real-time, but for now it just adds a button to format an existing doc
//As you write, each different element (Speaker, Header, Transition, Character...) 
//gets its own paragraph and a label (e.g. "S: " for Speaker)

function Formatter() {
  var mainStyle = {};
  mainStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Courier'; 
  mainStyle[DocumentApp.Attribute.MARGIN_LEFT] = 96;
  mainStyle[DocumentApp.Attribute.MARGIN_RIGHT] = 64;
  mainStyle[DocumentApp.Attribute.MARGIN_TOP] = 64;
  mainStyle[DocumentApp.Attribute.MARGIN_BOTTOM] = 64;
  var body = DocumentApp.getActiveDocument().getBody();
  body.setAttributes(mainStyle); //apply formatting
  var p = body.getParagraphs();
  for (var x = 0; x < p.length; x++) { //iterate through paragraphs, formatting accordingly
    var t = p[x].getText();
    switch (t.substring(0,2)) {
      case 'S:':
        Speaker(p[x]);
        //Dialog always follows Speaker so it doesn't get its own label, this just checks if you added an extra line between them
        (p[x+1].getText() == '') ? Dialog(p[x+2],false) : Dialog(p[x+1],true); 
        break;
      case 'H:':
        Header(p[x]);
        break;
      case 'C:':
        Character(p[x]);
        break;
      case 'T:':
        Transition(p[x]);
        break;
      default:
        break;
    }
  }
}

function Speaker(element) {
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER; //align
  var text = element.getText().substring(3); //remove label
  var par = text.indexOf('(');
  if (par > -1) { //if there's a speaker description, designated by "(" move it to its own line
    var split = text.split('(');
    text = split[0].toUpperCase() + '\n(' + split[1];
  }
  else text = text.toUpperCase();
  element.setText(text);
  element.setAttributes(style);
}

function Header(element) {
  element.setText(element.getText().substring(3).toUpperCase()); //get rid of label and capitalize
}

function Transition(element) {
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.RIGHT; //align
  element.setText(element.getText().substring(3).toUpperCase()); //get rid of label and capitalize
  element.setAttributes(style);
}

function Character(element) {
  var text = element.getText().substring(3); //get rid of label
  var space = text.indexOf(' ');
  text = text.substring(0, space).toUpperCase() + text.substring(space); //character gets capitalized, additional text does not
  element.setText(text);
}

function Dialog(element, space) {
  var indent = 100; 
  var text = element.getText();
  if (text.indexOf(':') == 1) {
    if (text.indexOf('D') == 0) text = text.substring(3); //just make sure that if the dialog is labeled it gets removed
    else return;
  }
  if (space) text = '\n' + text;
  element.setText(text);
  //indent
  element.setIndentStart(indent);
  element.setIndentFirstLine(indent);
  element.setIndentEnd(indent);
}

//Add button to toolbar/menu
function onOpen() {
  DocumentApp.getUi().createMenu("Scripts")
    .addItem("Format","Formatter")
  .addToUi();
}
