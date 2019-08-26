function NoaPlusPlugins(noa, babylon) {
	this.noa = noa;
	this.babylon = babylon;
	this.pluginList = [];
	this.blockCustomOptions = [];
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

NoaPlusPlugins.prototype.registerBlock = function(id, optionsDefault, optionsCustom) {
	this.blockCustomOptions[id] = optionsCustom;
	return this.noa.registry.registerBlock(id, optionsDefault);
}

NoaPlusPlugins.prototype.getBlockCustomOptions = function(id, optionName) {
	if (optionName in this.blockCustomOptions[id]) {
		return this.blockCustomOptions[id][optionName];
	} else {
		return null;
	}
}