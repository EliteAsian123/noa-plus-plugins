function ExamplePlugin(message) {
	this.message = message;
}

ExamplePlugin.prototype.init = function() {
	console.log(this.message);
}