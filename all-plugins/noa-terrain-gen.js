/////////////////////////////////////////////////////////////
//                                                         //
// Plugin by: EliteAsian123                                //
// Code by: EliteAsian123, Andy Hall                       //
//                                                         //
// This plugin adds simple functions to generate terrain.  //
//                                                         //
/////////////////////////////////////////////////////////////

function NoaTerrainGen(nppb) {
	this.nppb = nppb;
}

NoaTerrainGen.prototype.init = function() {}

NoaTerrainGen.prototype.getName = function() {
	return "Noa Terrain Gen";
}

NoaTerrainGen.prototype.setTerrainGenType = function(type) {
	this.genType = type;
}

NoaTerrainGen.prototype.genTerrain = function(id, data, x, y, z, blockIDs) {
	switch (this.genType) {
		case "default":
			// From hello-world example
			for (var x1 = 0; x1 < data.shape[0]; x1++) {
				for (var y1 = 0; y1 < data.shape[1]; y1++) {
					for (var z1 = 0; z1 < data.shape[2]; z1++) {
						var voxelID = 0;
						if (y + y1 < -3) voxelID = blockIDs[1];
						var height = 2 * Math.sin((x + x1) / 10) + 3 * Math.cos((z + z1) / 20);
						if (y + y1 < height) voxelID = blockIDs[0];
						data.set(x1, y1, z1, voxelID);
					}
				}
			}
		break;
		
		case "flat":
			for (var x1 = 0; x1 < data.shape[0]; ++x1) {
				for (var z1 = 0; z1 < data.shape[2]; ++z1) {
					for (var y1 = 0; y1 < data.shape[1]; ++y1) {
						if (y1 + y === 5) {
							data.set(x1, y1, z1, blockIDs[0]);
						} else if (y1 + y < 5 && y1 + y > 0) {
							data.set(x1, y1, z1, blockIDs[1]);
						} else if (y1 + y <= 0) {
							data.set(x1, y1, z1, blockIDs[2]);
						}	
					}
				}
			}
		break;
		
		default:
			console.error(this.genType + " is not a generation type.");
	}
	return data;
}