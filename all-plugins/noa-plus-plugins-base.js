function NoaPlusPlugins(noa, babylon) {
	this.noa = noa;
	this.babylon = babylon;
	this.pluginList = [];
	console.log("NoaPlusPlugins v1.0.0");
}

NoaPlusPlugins.prototype.addPlugin = function(plugin) {
	try {
		plugin.init();
	} catch(err) {
		console.error("Tried to add a plugin that isn't a plugin.");
	}
	
	this.pluginList.push(plugin);	
}