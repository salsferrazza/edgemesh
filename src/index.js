/**
 * Instantiate edgemesh client
 * @param  {Object} opts configuration options
 * @return {Promise}   returns
 */

import Emitter from 'component-emitter';

const HOST = 'sig.edgeno.de';

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
			client: HOST,
			host: HOST,
			swPath: '/'
		}, opts);

        // Create script tag
		const body = document.getElementsByTagName('body')[0];
		const script = document.createElement('script');

        // Create script tag
		script.type = 'text/javascript';
		script.onload = () => {
			window.edgemesh = new window.Edgemesh(this.opts);
			this.emit('ready', window.edgemesh);
		};

        // Inject script
		script.src = 'https://' + this.opts.client + '/edgemesh.client.min.js';
		body.appendChild(script);

        // Set element
		this.element = script;
	}

}
