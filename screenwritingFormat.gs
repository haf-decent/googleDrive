function Speaker(element) {
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  var text = element.getText().substring(3);
  var par = text.indexOf('(');
  if (par > -1) {
    var split = text.split('(');
    text = split[0].toUpperCase() + '\n(' + split[1];
  }
  else text = text.toUpperCase();
  element.setText(text);
  element.setAttributes(style);
}

function Header(element) {
  element.setText(element.getText().substring(3).toUpperCase());
}

function Transition(element) {
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.RIGHT;
  element.setText(element.getText().substring(3).toUpperCase());
  element.setAttributes(style);
}

function Character(element) {
  var text = element.getText().substring(3);
  var space = text.indexOf(' ');
  text = text.substring(0, space).toUpperCase() + text.substring(space);
  element.setText(text);
}

function Dialog(element, space) {
  var indent = 100;
  var text = element.getText();
  if (text.indexOf(':') == 1) {
    if (text.indexOf('D') == 0) text = text.substring(3);
    else return;
  }
  if (space) text = '\n' + text;
  element.setText(text);
  element.setIndentStart(indent);
  element.setIndentFirstLine(indent);
  element.setIndentEnd(indent);
}

function Formatter() {
  var mainStyle = {};
  mainStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Courier';
  mainStyle[DocumentApp.Attribute.MARGIN_LEFT] = 96;
  mainStyle[DocumentApp.Attribute.MARGIN_RIGHT] = 64;
  mainStyle[DocumentApp.Attribute.MARGIN_TOP] = 64;
  mainStyle[DocumentApp.Attribute.MARGIN_BOTTOM] = 64;
  var body = DocumentApp.getActiveDocument().getBody();
  body.setAttributes(mainStyle);
  var p = body.getParagraphs();
  for (var x = 0; x < p.length; x++) {
    var t = p[x].getText();
    switch (t.substring(0,2)) {
      case 'S:':
        Speaker(p[x]);
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

function onOpen() {
  DocumentApp.getUi().createMenu("Scripts")
    .addItem("Format","Formatter")
  .addToUi();
}
