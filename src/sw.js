/* eslint no-var: 0, object-shorthand: 0, prefer-arrow-callback: 0 */

/**
 * Edgemesh Service Worker
 *
 * @module emsw
 *
 */

// Event constants
var DOM_LOADED = 'DOM_LOADED';
var DOM_UNLOADED = 'DOM_UNLOADED';
var MESH_INTERCEPT = 'MESH_INTERCEPT';

// Service worker version
self.version = 1.2;

// Supported extensions
self.supportedExtensions = [ 'jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg', 'webp' ];

// State container
var state = {};

var dataURItoBlob = function (dataURI) {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);

	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ ab ], { type: mimeString });
};

var onePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=';

var respondMesh = function (clientId, assets) {
	self.clients.get(clientId).then(function (client) {
		client.postMessage({
			channel: MESH_INTERCEPT,
			value: { assets: assets }
		});
	});
};

var respondBlank = function (event) {
	event.respondWith(new Response(dataURItoBlob(onePixel)));
};

var checkState = function (client, originId, assetId, url) {
	if (state.domLoaded) {
		// DOM is ready. Respond mesh
		var asset = {};
		asset[url] = originId + '|' + assetId;
		respondMesh(client, asset);
	} else {
		// DOM isnt ready.  Push into queue
		if (!state.pendingAssets) {
			state.pendingAssets = {};
		}
		if (!state.pendingAssets[client]) {
			state.pendingAssets[client] = [];
		}
		state.pendingAssets[client].push({
			key: originId + '|' + assetId,
			url: url
		});
	}
};

var hash = function (key) {
	var hash = 0;

	if (key.length === 0) {
		return hash;
	}
	for (var i = 0; i < key.length; i++) {
		var char = key.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash &= hash;
	}
	return hash;
};

var getLocation = function (href) {
	var match = href.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
	return match && {
		protocol: match[1],
		host: match[2],
		hostname: match[3],
		port: match[4],
		pathname: match[5],
		search: match[6],
		hash: match[7]
	};
};

// When the service worker installs
self.addEventListener('install', function (event) {
    // Set up initial state
	state.domLoaded = false;
	state.fetchActive = false;
	state.pendingAssets = {};
    // Skip waiting
	event.waitUntil(self.skipWaiting());
});

// Postmessage event handler
self.addEventListener('activate', function (event) {
    // Set up initial state
	state.domLoaded = false;
	state.fetchActive = false;
	state.pendingAssets = {};
    // Claim client
	event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function (event) {
	switch (event.data.channel) {
        // Called when the DOM is loaded
		case DOM_LOADED: {
            // Set loaded state
			state.domLoaded = true;
            // Store client id
			var clientId = event.source.id;
            // Process pending queue
			var pendingAssets = state.pendingAssets && state.pendingAssets[clientId] ?
				state.pendingAssets[clientId] : [];

			var assets = {};
            // Map out assets
			pendingAssets.forEach(function (obj) {
				assets[obj.url] = obj.key;
			});
            // Respond mesh
			respondMesh(clientId, assets);
            // Clean up map
			if (pendingAssets.length !== 0) {
				delete state.pendingAssets[clientId];
			}
			break;
		}
        // Called when the DOM is closed
		case DOM_UNLOADED: {
            // Reset state
			state.domLoaded = false;
			state.fetchActive = false;

			break;
		}
		default:
			// Do nothing
	}
});

// Handle Fetch event
self.addEventListener('fetch', function (event) {
    // Store client id
	var client = event.clientId;
    // Look for edgemesh script
	var isEdgemesh = event.request.url.indexOf('edgemesh.client.min.js') !== -1;
    // Set fetch to active when script is found
	if (isEdgemesh) {
		state.fetchActive = true;
		state.domLoaded = false;
	}

    // Capture fetch events
	if (state.fetchActive) {
        // Get url from event
		var url = event.request.url;
        // Get extension
		var urlArray = url.split('.');
		var fileExtension = urlArray[urlArray.length - 1].toLowerCase();

		if (self.supportedExtensions.indexOf(fileExtension) === -1) {
			// Not a mesh file.  Skip.
			event.respondWith(fetch(event.request));
		} else {
			var location = getLocation(url);
			var originId = hash(location.hostname);
			var assetId = hash(location.pathname);
			respondBlank(event);
			checkState(client, originId, assetId, url);
		}
	}
});
