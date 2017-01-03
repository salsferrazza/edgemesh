/**
 * Edgemesh Service Worker
 *
 * @module emsw
 *
 */

// event constants
var DOM_LOADED = 'DOM_LOADED',
    DOM_UNLOADED = 'DOM_UNLOADED',
    MESH_INTERCEPT = 'MESH_INTERCEPT';

// service worker version
self.version = 1.2;

// supported extensions
self.supportedExtensions = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg', 'webp'];

// the state of the edgemesh DOM is stored here
var state = {};

// when the service worker installs
self.addEventListener('install', function(event) {
    // Set up initial state
    state.dom_loaded = false;
    state.fetch_active = false;
    state.pending_assets = {};
    // Skip waiting
    event.waitUntil(self.skipWaiting());

});

// postmessage event handler
self.addEventListener('activate', function(event) {
    // Set up initial state
    state.dom_loaded = false;
    state.fetch_active = false;
    state.pending_assets = {};
    // Claim client
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function(event) {
    switch(event.data.channel) {
        // called when the DOM is loaded
        case DOM_LOADED: {
            // set loaded state
            state.dom_loaded = true;
            // Store client id
            var clientId = event.source.id;
            // Process pending queue
            var pending_assets = state.pending_assets && state.pending_assets[clientId]
                ? state.pending_assets[clientId]
                : [];

            var assets = {};
            // Map out assets
            pending_assets.forEach(function(obj) {
                assets[obj.url] = obj.key;
            });
            // Respond mesh
            respondMesh(clientId, assets);
            // Clean up map
            if(pending_assets.length) {
                delete state.pending_assets[clientId];
            }
            break;
        }
        // called when the DOM is closed
        case DOM_UNLOADED: {
            // reset state
            state.dom_loaded = false;
            state.fetch_active = false;

            break;
        }
    }
});

// Handle Fetch event
self.addEventListener('fetch', function(event) {
    // Store client id
    var client = event.clientId;
    // Look for edgemesh script
    var isEdgemesh = event.request.url.indexOf('edgemesh.client.min.js') !== -1;
    // set fetch to active when script is found
    if(isEdgemesh) {
        state.fetch_active = true;
        state.dom_loaded = false;
    }

    // capture fetch events
    if (state.fetch_active) {

        // Get url from event
        var url = event.request.url;
        // Get extension
        var urlArray = url.split('.');
        var fileExtension = urlArray[urlArray.length - 1].toLowerCase();

        if (self.supportedExtensions.indexOf(fileExtension) !== -1) {

            var location = getLocation(url);
            var origin_id = hash(location.hostname);
            var asset_id = hash(location.pathname);

            respondBlank(event);
            checkState(client, origin_id, asset_id, url);

        } else {
            // Not a mesh file.  Skip.
            event.respondWith(fetch(event.request));
        }
    }
});

var checkState = function(client, origin_id, asset_id, url) {
    if(!state.dom_loaded) {
        // DOM isnt ready.  Push into queue
        if(!state.pending_assets) state.pending_assets = {};
        if(!state.pending_assets[client]) state.pending_assets[client] = [];
        state.pending_assets[client].push({
            key: origin_id + '|' + asset_id,
            url: url
        });
    } else {
        var asset = {};
        asset[url] = origin_id + '|' + asset_id;
        respondMesh(client, asset);
    }
}

var respondMesh = function(clientId, assets) {
    self.clients.get(clientId)
        .then(function(client) {
            client.postMessage({
                channel: MESH_INTERCEPT,
                value: { assets: assets }
            });
        });
}

var respondBlank = function(event) {
    event.respondWith(new Response( dataURItoBlob(onePixel)));
}

var hash = function(key) {
	var hash = 0, i, char, len;
	if (key.length === 0) return hash;
    for (i = 0; i < key.length; i++) {
        char = key.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
}

var getLocation = function(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

var dataURItoBlob = function(dataURI) {

  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {type: mimeString});

}

var onePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=';
