var _ = require("underscore");
var url = require('url'),
    path = require('path'),
    fs = require('fs-extra'),
    marked = require('marked');

var settings  = require('./content/settings.js');

  var chapterFolder = settings.folder;
  var contentFolder = "content/";
  // var imagesFolder = "images";
  var longFolder = "long";
  var shortFolder = "short";
  var pdfFolder = "pdf";

  // var imageFolderPath = contentFolder+chapterFolder+imagesFolder;
  var longFolderPath = contentFolder+chapterFolder+longFolder;
  var shortFolderPath = contentFolder+chapterFolder+shortFolder;
  var pdfFolderPath = contentFolder+chapterFolder+pdfFolder;


module.exports = function(app,io,m){

  /**
  * routing event
  */
  app.get("/", getIndex);
  app.get("/print", getPrint);

  /**
  * routing functions
  */

  // GET
  function getIndex(req, res) {
    
    var dataToSend = {
      title: "PJ Machine",
    }
    res.render("index", dataToSend);

  };

  function getPrint(req, res) {
    var dataToSend = {
      title: "PJ Machine | Print",
    }

    res.render("print", dataToSend);
  };


  function getText(textDir){
    // List text
    var textArray = [];
    var arrayOfFiles = fs.readdirSync(textDir);

    arrayOfFiles.forEach( function (file) {
      var textInFile = fs.readFileSync(textDir+'/'+file, 'utf8');
      textArray.push(textInFile);
    });
    var randomIndex = textArray.length - 1;
    var randomFile = marked(textArray[randomIndex]);
    return {index: randomIndex, file: randomFile};
  }

};
