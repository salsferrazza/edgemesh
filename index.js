module.exports = function(options) {

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');

    var client = options.client || 'unpkg.com/edgemesh@latest';

    script.type = 'text/javascript';
    script.onload = function() {
        window.edgemesh = new window.Edgemesh({ 
            debug: options.debug || false,
            host: options.host || 'sig.edgeno.de',
            client: client,
            path: options.swPath || '/'
        });
    }
    script.src = 'https://' + client + '/edgemesh.client.min.js';
    head.appendChild(script);

}