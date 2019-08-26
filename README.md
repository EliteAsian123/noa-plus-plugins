# noa-plus-plugins
This is a library that adds plugin support to [Noa Engine](https://github.com/andyhall/noa). noa-plus-plugins is in beta so there isn't much yet. The test-game is based off of the [Hello World Example](https://github.com/andyhall/noa-examples). If you are using this, it is required that you have prior knowledge of Noa.

# Usage - Using Plugins
Clone this repository and move the `all-plugins` folder into your project (Make sure you have [Noa Engine](https://github.com/andyhall/noa) installed in that same project!) then in the index.html file, add these lines of code **above bundle.js**:
```html
<script type="text/javascript" src="all-plugins/noa-plus-plugins-base.js"></script>
<script type="text/javascript" src="all-plugins/example-plugin.js"></script>
```
Yep! No `npm`! This is done to make it easier to develop plugins for noa-plus-plugins, because you don't have to compile it everytime!
To setup noa-plus-plugins, go into you index.js (that'll compile into your bundle.js) and add:
```js
// Init noa-plus-plugins
var nppb = new NoaPlusPlugins(noa, BABYLON);
  
// Add the ExamplePlugin and make it say "Hello World" (You can delete this)
var examplePlugin = new ExamplePlugin(nppb, "Hello World!");
nppb.addPlugin(examplePlugin);

// Add any other plugins here
```
Note that `BABYLON` is the legacy `BABYLON` variable, and can be gotten like this:
```js
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
```
More info is available in the [Wiki Tab](https://github.com/EliteAsian123/noa-plus-plugins/wiki)!

# Usage - Making Plugins
Info *will* available in the [Wiki Tab](https://github.com/EliteAsian123/noa-plus-plugins/wiki)!

# Thanks
**MASSIVE** thanks to [Andy Hall](https://github.com/andyhall/) for making this amazing engine in the first place!

# License 
MIT
