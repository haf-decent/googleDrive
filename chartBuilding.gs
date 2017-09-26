//This file builds multiple charts from rows in a data table in a spreadsheet

//First we get the data from the sheet
function createCharts() {
  var sheet = SpreadsheetApp.getActive().getActiveSheet();
  
  var charts = sheet.getCharts();
  if (charts.length > 0) charts.forEach(function(c) {sheet.removeChart(c);}); //get rid of any charts already on the page
  
  //var range = sheet.getDataRange(); //assuming the data is the only stuff on the sheet, this will select it
  
  var fRow = sheet.getRange(1,4,5,1).getValues(); 
  //if you don't have consistent formatting, this will search for the first row with values
  for (var i = 1; i < 6; i++) {
    if (fRow[i-1][0] !== null) break;
  }
  
  var nRow = sheet.getLastRow(),
      nCol = sheet.getLastColumn(),
      range,
      title;
  // this loop runs through each row of the data table, building a chart for each one
  for (var x = 4; x <= nRow; x++) {
    title = sheet.getRange(x,nCol-9).getValue().toUpperCase(); //pulling a title from the table, formatting it to be uppercase
    range = sheet.getRange(x,nCol-8,1,7); //pulling the actual data range
    chartBuilder(sheet,title,range,x-2); //passing info to the chart builder
  }
}

//I initialized some style variables as globals to save time in the loop
var titleStyle = Charts.newTextStyle().setFontName("Roboto").setFontSize(24).build(), //style for the title of the chart
    colors = ["#4a86e8","#df520e","#ffd966","#6aa84f","#9900ff","#4bc0e3","#c22a9a"], //colors for the bars/slices
    width = 450, //width of the full chart
    height = 450; //height of the full chart

function chartBuilder(sheet,title,range,start) {
  var labels = sheet.getRange(3,3,1,7).getValues()[0]; //the top row of my spreadsheet are headers for labeling in the legend
  //labelObj labels each of the bars/slices with headers from above,
  //and tells the chart to show the value of each on the corresponding bar/slice
  var labelObj = { 
    0: {labelInLegend: labels[0], dataLabel: 'value'}, 
    1: {labelInLegend: labels[1], dataLabel: 'value'}, 
    2: {labelInLegend: labels[2], dataLabel: 'value'}, 
    3: {labelInLegend: labels[3], dataLabel: 'value'}, 
    4: {labelInLegend: labels[4], dataLabel: 'value'}, 
    5: {labelInLegend: labels[5], dataLabel: 'value'}, 
    6: {labelInLegend: labels[6], dataLabel: 'value'}
  };
  
  var chart = sheet.newChart(); //create a chart
  chart.addRange(range).setChartType(Charts.ChartType.COLUMN); //tell it to use which row data and set the chart type
  
  //now we customize the chart
  chart.asColumnChart()
    .setTitle(title).setTitleTextStyle(titleStyle) 
    .setColors(colors)
    .setOption("series", labelObj)
    .setOption("legend", {position: 'bottom', textStyle: {fontName: "Roboto"}})
    .setOption("width", width).setOption("height", height)
    //.setOption("bar", {groupWidth: "95%"}); //was hoping this works for adjusting the width of the bars, but it does not
  chart.setPosition(start, 13, 1, 1);
  
  sheet.insertChart(chart.build()); //important to call chart.build() before inserting it into the sheet
}

//finally an onOpen function that adds the createCharts function to the toolbar/menu
function onOpen() {
  SpreadsheetApp.getUi().createMenu("Charts").addItem("Create Charts", "createCharts").addToUi();
}
