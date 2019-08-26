/////////////////////////////////////////////////////////////
//        												   //
// Plugin by: EliteAsian123								   //
// Code by: EliteAsian123      							   //
//														   //
// This plugin adds saves chunks to RAM.			       //
//														   //
/////////////////////////////////////////////////////////////

function NoaChunkSave(nppb, voxelCrunch) {
	this.nppb = nppb;
	this.voxelCrunch = voxelCrunch;
	this.saveData = {};
}

NoaChunkSave.prototype.init = function() {}

NoaChunkSave.prototype.getName = function() {
	return "Noa Chunk Save";
}

NoaChunkSave.prototype.chunkSave = function(id, array) {
	var encodedData = this.voxelCrunch.encode(array.data, new Uint16Array(array.data.length));
	this.saveData[id.toString()] = encodedData;
}

NoaChunkSave.prototype.chunkLoad = function(id, data) {
	var decodedData = this.voxelCrunch.decode(this.saveData[id.toString()], new Uint16Array(data.data.length));
	data.data = decodedData;
	return data;
}

NoaChunkSave.prototype.isChunkSaved = function(id) {
	return (id.toString() in this.saveData);
}