/**
 * @flow
 *
 * Instantiate edgemesh client
 * @param  {Object} opts configuration options
 * @return {undefined}   returns void
 */
export default function(opts = {}) {

    return new Promise((resolve, reject) => {
        // Create script tag
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');

        // Set default client
        let client = opts.client || 'unpkg.com/edgemesh';

        // Create script tag
        script.type = 'text/javascript';
        script.onload = function() {
            window.edgemesh = new window.Edgemesh({
                debug: opts.debug || false,
                host: opts.host || 'sig.edgeno.de',
                client: client,
                swPath: opts.swPath || '/'
            });
            resolve(window.edgemesh);
        }

        // Inject script
        script.src = 'https://' + client + '/edgemesh.client.min.js';
        head.appendChild(script);

    });

}
