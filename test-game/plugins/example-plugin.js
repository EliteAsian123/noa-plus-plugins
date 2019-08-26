function ExamplePlugin(message) {
	this.message = message;
}

ExamplePlugin.prototype.init = function() {
	console.log(this.message);
}

ExamplePlugin.prototype.say = function(str) {
	console.log(str);
}