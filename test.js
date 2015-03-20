var barstool = require('./barstool.js');


barstool.fetch( function (err,sheet) {
  console.log( sheet.foundSheetNames );
})