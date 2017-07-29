/* VARIABLES */
var socket = io.connect();
var converter = new showdown.Converter({'tables':true});


/* sockets */
function onSocketConnect() {
	sessionId = socket.io.engine.id;
	console.log('Connected ' + sessionId);
	socket.emit('listFiles');
};

function onSocketError(reason) {
	console.log('Unable to connect to server', reason);
};

/* sockets */
socket.on('connect', onSocketConnect);
socket.on('error', onSocketError);

socket.on('displayPageEvents', onDisplayPage);

jQuery(document).ready(function($) {


});


function init(){

	
}



function onDisplayPage(foldersData){
	$.each( foldersData, function( index, fdata) {
  	var $folderContent = makeFolderContent( fdata);
    return insertOrReplaceFolder( fdata.slugFolderName, $folderContent);
  });
	console.log(foldersData);
  var firstIndex = parseInt(foldersData[0].index);
  var firstNbOfFiles= foldersData[0].nbOfFiles;

  // Meta-data
	$('.meta-data .block-select').html(foldersData[0].slugFolderName + " folder:");
	$('.meta-data .file-select').html(firstIndex+"/"+firstNbOfFiles);

	// $('.content').textfill({ maxFontPixels: 300, innerTag: ".test", changeLineHeight : true, minFontPixels    : 1, })

	var partCount = parseInt($('.page-wrapper').attr('data-part'));
	data = foldersData[partCount];

	// Put the object into storage
	localStorage.setItem('foldersdata', JSON.stringify(foldersData));
	localStorage.setItem('data', JSON.stringify(data));

	init();
}


function insertOrReplaceFolder( slugFolderName, $folderContent) {
  $(".page-wrapper").append( $folderContent);

  return "inserted";
}

// Display elements in HTML
function makeFolderContent( projectData){

	console.log(projectData)
	
	var index = projectData.index;
	var folder = projectData.slugFolderName;
	var txt = projectData.text;
	var image = projectData.currentImage;


	var newFolder = $(".js--templates > .content").clone(false);

	// customisation du projet
	newFolder
	  .attr( 'data-index', index)
	  .attr( 'data-folder', folder)
	  .css({
	  	'transform': 'scale('+projectData.zoom+')',
	  	'left': projectData.xPos+'cm',
			'top':projectData.yPos+'cm',
			'word-spacing': projectData.wordSpace +'px', 
			'width': projectData.blockSize +'cm'
	  })

  ;



  if(txt == 'undefined'){
		newFolder.html('<img src="'+image+'">');
  }
  else{
  	newFolder.html('<div class="test">'+converter.makeHtml(txt)+'</div>');
  }

	return newFolder;
}







