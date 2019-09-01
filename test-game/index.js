"use strict";

// Engine options object, and engine instantiation:
import Engine from "noa-engine";

// NPPB requires the class BABYLON (legacy)
import * as BABYLON from "@babylonjs/core/Legacy/legacy";

// Voxel Crunch
var voxelCrunch = require("voxel-crunch");

// GL Vector3
var glvec3 = require("gl-vec3");

var opts = {
    debug: true,
    showFPS: true,
    chunkSize: 32,
    chunkAddDistance: 2.5,
    chunkRemoveDistance: 3.5
}
var noa = new Engine(opts)

// Loading plugins (noa-plus-plugins)
var nppb = new NoaPlusPlugins(noa, BABYLON);

var noaTerrainGen = new NoaTerrainGen(nppb, "ddd");
nppb.addPlugin(noaTerrainGen);
var terrainOptions = {
	a_zoom: 100,
	a_height: 7,
	b_zoom: 50,
	b_height: 3,
	c_zoom: 500,
	c_height: 10
};

var noaChunkSave = new NoaChunkSave(nppb, voxelCrunch);
nppb.addPlugin(noaChunkSave);

var noaEnvironment = new NoaEnvironment(nppb, "textures/clouds.png");
nppb.addPlugin(noaEnvironment);
noaEnvironment.setCloudOptions(1, new BABYLON.Color3(1, 1, 1), 100);

var texturesArray = [
	"textures/break_decal_0.png",
	"textures/break_decal_1.png",
	"textures/break_decal_2.png",
	"textures/break_decal_3.png",
	"textures/break_decal_4.png",
	"textures/break_decal_5.png",
	"textures/break_decal_6.png",
	"textures/break_decal_7.png"
];
var noaBlockBreak = new NoaBlockBreak(nppb, glvec3, texturesArray);
nppb.addPlugin(noaBlockBreak);

// Block materials
noa.registry.registerMaterial("dirt", null, "textures/dirt.png");
noa.registry.registerMaterial("grass", null, "textures/grass.png");
noa.registry.registerMaterial("stone", null, "textures/stone.png");

// Block types
var dirtID = nppb.registerBlock(1, { material: "dirt" }, { hardness: 2 });
var grassID = nppb.registerBlock(2, { material: "grass" }, { hardness: 2.1 });
var stoneID = nppb.registerBlock(3, { material: "stone" }, { hardness: 5 });

// chunkBeingRemoved Event
noa.world.on('chunkBeingRemoved', function(id, array, userData) {
    noaChunkSave.chunkSave(id, array);
});


// worldDataNeeded Event
noa.world.on("worldDataNeeded", function (id, data, x, y, z) {
	if (noaChunkSave.isChunkSaved(id)) {
		data = noaChunkSave.chunkLoad(id, data);
	} else {
		data = noaTerrainGen.genAdvancedTerrain(id, data, x, y, z, [grassID, dirtID, stoneID], terrainOptions);
	}
    // Tell noa the chunk's terrain data is now set
    noa.world.setChunkData(id, data);
});

// Get the player entity's ID and other info (position, size, ..)
var player = noa.playerEntity;
var dat = noa.entities.getPositionData(player);
var w = dat.width;
var h = dat.height;


// Add a mesh to represent the player, and scale it, etc.
var scene = noa.rendering.getScene();
var mesh = BABYLON.Mesh.CreateBox("player-mesh", 1, scene);
mesh.scaling.x = w;
mesh.scaling.z = w;
mesh.scaling.y = h;


// Add "mesh" component to the player entity
// This causes the mesh to move around in sync with the player entity
noa.entities.addComponent(player, noa.entities.names.mesh, {
    mesh: mesh,
    /* Offset vector is needed because noa positions are always the 
	   bottom-center of the entity, and Babylon"s CreateBox gives a 
	   mesh registered at the center of the box */
    offset: [0, h / 2, 0]
});

noa.inputs.down.on("fire", function () {
    //if (noa.targetedBlock) noa.setBlock(0, noa.targetedBlock.position);
	noaBlockBreak.fireDown();
});

noa.inputs.up.on("fire", function () {
    //if (noa.targetedBlock) noa.setBlock(0, noa.targetedBlock.position);
	noaBlockBreak.fireUp();
});

// Place some grass on right click
noa.inputs.down.on("alt-fire", function () {
    if (noa.targetedBlock) noa.addBlock(stoneID, noa.targetedBlock.adjacent);
});

// Flying by Levlups
var body = noa.entities.getPhysicsBody(noa.playerEntity);
var hovering = false
noa.inputs.bind('hover', 'R');
noa.inputs.down.on('hover', function() {
	hovering = true;
});

function hover(noa, body) {
	var f = (body.velocity[1] < 0) ? 40 : 24;
	body.applyForce([0, f, 0]);
}

noa.inputs.up.on('hover', function() {
	hovering = false;
});

// Ran each tick
noa.on('tick', function(dt) {
	if (hovering) hover(noa, body);
});

// Ran before each render
noa.on('beforeRender', function(dt) {
	noaEnvironment.moveClouds(dt / 1000000, 0);
	noaBlockBreak.render(dt, 1);
});
