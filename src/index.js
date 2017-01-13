/**
 * Instantiate edgemesh client
 * @param  {Object} opts configuration options
 * @return {Promise}   returns
 */

import Emitter from 'component-emitter';

export default class Edgemesh extends Emitter {

	element = null;

	constructor(opts = {}) {
		super();

        // Create script tag
		let head = document.getElementsByTagName('head')[0];
		let script = document.createElement('script');

        // Set default client
        // NOTE: Update this to dist on next push
		let client = opts.client || 'unpkg.com/edgemesh';

        // Create script tag
		script.type = 'text/javascript';
		script.onload = () => {
			window.edgemesh = new window.Edgemesh({
				debug: opts.debug || false,
				host: opts.host || 'sig.edgeno.de',
				swPath: opts.swPath || '/'
			});
			this.emit('ready', window.edgemesh);
		};

        // Inject script
		script.src = 'https://' + client + '/edgemesh.client.min.js';
		head.appendChild(script);

        // Set element
		this.element = script;
	}

}
