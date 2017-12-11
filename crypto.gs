/*
This is a script for locally tracking cryptocurrency prices and marketcaps
as well as Industry, Description, and Blockchain info that you can fill in as
you research each new coin.

I've used this to track my portfolio's performance (replacing an app like Blockfolio),
as well as set custom price alerts, simulate trading strategies, and organize my 
research. I set the updateMe() function on a trigger to fire every 30min to keep prices
up to date. I'll add the other functions, like adding/tracking your portfolio for example
once I get them formatted nicely.
*/

function updateMe() {
  //Make request to CoinMarketCap ticker API
  var request = UrlFetchApp.fetch("https://api.coinmarketcap.com/v1/ticker/?limit=0");
  var res = JSON.parse(request.getContentText());

  var sheet = SpreadsheetApp.getActive().getSheetByName(""); //Put name of sheet (tab) here
  var rEnd = sheet.getLastRow() - 2;
  
  var names = [],
      data = [];
  //if sheet has already been initialized, get old data
  if (rEnd > 0) {
    names = sheet.getRange(3, 2, rEnd, 2).getValues(); //names and symbols column
    data = sheet.getRange(3, 4, rEnd, 5).getValues(); //rest of data columns
  }
  //else initialize sheet
  else {
    sheet.getRange(2, 2, 1, 7)
      .setValues([["Crypto", "Symbol", "Price", "MarketCap", "Industry", "Description", "Blockchain"]])
      .setBackgroundColor("black")
      .setFontColor("white")
      .setFontWeight("bold");
  }
  
  //initialize array for storing new values
  var arr = [];
  
  //run through coin names from old data
  for (var i = 0; i < names.length; i++) {
    //run through new data
    for (var x = 0; x < res.length; x++) {
      //Match the new entry to the old by name
      if (res[x].symbol == names[i][1]) {
        //Update new value array
        arr[i] = [
          names[i][0], //Crypto
          names[i][1], //Symbol
          "$" + res[x].price_usd || data[i][0], //Price
          res[x].market_cap_usd || data[i][1], //MarketCap
          data[i][2], //Industry
          data[i][3], //Description
          data[i][4] //Blockchain
        ];
        //Remove entry from new data
        res.splice(x,1);
        //Move to next name
        x = res.length;
      }
    }
  }
  //If there are still new entries, add new coins to array
  for (i = 0; i < res.length; i++) {
    arr[arr.length] = [
      res[i].name, //Crypto
      res[i].symbol, //Symbol
      parseFloat(res[i].price_usd) || null, //Price
      parseFloat(res[i].market_cap_usd) || null, //MarketCap
      null, //Industry
      null, //Description
      null //Blockchain
    ];
  }
  //was getting a weird error where one entry in the new array was empty,
  //opted to fill in entries one at a time instead of in bulk, which is way slower, 
  //but was the only way I could figure out to fix the error :/
  for (var r = 0; r < arr.length; r++) {
    if (!arr[r]) continue;
    sheet.getRange(3+r, 2, 1, 7).setValues([arr[r]]);
  }
}
