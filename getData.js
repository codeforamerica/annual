var fs = require('fs');
var Tabletop = require('tabletop');

var sheetUrl = 'https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml';

function onLoad(data, tabletop) {
  console.log(data);
  var jsonData = JSON.stringify(data);
  fs.writeFile('_data/Report.json', jsonData, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
};

var options = {
  key: sheetUrl,
  callback: onLoad,
  simpleSheet: true
};

Tabletop.init(options);