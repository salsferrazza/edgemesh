/**
 * Instantiate edgemesh client
 * @param  {Object} opts configuration options
 * @return {Promise}   returns
 */

import Emitter from 'component-emitter';

export default class Edgemesh extends Emitter {

	/**
	 * Script tag that edgemesh is imported with
	 * @type {Element}
	 */
	element = null;

	/**
	 * Creates an instance of Edgemesh
	 * @type {Object} opts
	 * @returns Edgemesh
	 *
	 */
	constructor(opts = {}) {
		super();
		// Defalt options
		this.opts = Object.assign({
			debug: false,
			// NOTE: Update this to dist on next push
			client: 'unpkg.com/edgemesh',
			host: 'sig.edgeno.de',
			swPath: '/'
		}, opts);

        // Create script tag
		const head = document.getElementsByTagName('head')[0];
		const script = document.createElement('script');

        // Create script tag
		script.type = 'text/javascript';
		script.onload = () => {
			window.edgemesh = new window.Edgemesh(this.opts);
			this.emit('ready', window.edgemesh);
		};

        // Inject script
		script.src = 'https://' + this.opts.client + '/edgemesh.client.min.js';
		head.appendChild(script);

        // Set element
		this.element = script;
	}

}
