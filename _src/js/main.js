///////////////////////////////////////////////////////////////////////////
//                                                                       //
//   HELLO DEV. All your custom code should go in its own modules and    //
//   views directories. Configuration (selectors and whatnot) should     //
//   go in the `config/configMain.js` file. Each bundle should have      //
//   their own config file. Check the README or ask someone if you       //
//   have questions. Happy developing!                                   //
//                                                                       //
///////////////////////////////////////////////////////////////////////////

var config = require('./config/configMain'),
	$ = require('jquery'),
	toRequire = [],
	toIgnore = [];

function queueFiles(i, file){
	if( file.charAt(0) === '!' ){
		toIgnore.push(file);
	} else {
		toRequire.push(file);
	}
}

// run selector filters
for(var sel in config.selectors){

	if( $(sel).length === 0 )
		continue;

	$.each(config.selectors[sel], queueFiles);

}

// require the files if not in toIgnore
$.each(toRequire, function (i, moduleId) {
	if($.inArray('!' + module, toIgnore) === -1){
		var module = require(moduleId);

		if( $.isFunction(module) ){
			module();
		}
	}
});

// browserfiy solution
// ========
return;  require('./lib/polyfill.object.keys');  require('./lib/polyfill.array.forEach');  require('./modules/responsiveImages');  require('./modules/sampleModule');  require('./views/sampleView'); 