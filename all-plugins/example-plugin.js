/////////////////////////////////////////////////////////////
//                                                         //
// Plugin by: EliteAsian123                                //
// Code by: EliteAsian123                                  //
//                                                         //
// This is a example plugin and just prints things into    //
// the console.                                            //
//                                                         //
/////////////////////////////////////////////////////////////

function ExamplePlugin(nppb, message) {
	this.nppb = nppb;
	this.message = message;
}

ExamplePlugin.prototype.init = function() {
	console.log(this.message);
}

ExamplePlugin.prototype.getName = function() {
	return "Example Plugin";
}

ExamplePlugin.prototype.say = function(str) {
	console.log(str);
}