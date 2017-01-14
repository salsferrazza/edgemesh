import Edgemesh from '../src';

describe('Edgemesh', () => {
	it('Should create a script tag', done => {
		let file = 'https://unpkg.com/edgemesh/edgemesh.client.min.js';
		let edgemesh = new Edgemesh();
		assert.isDefined(edgemesh);
		expect(edgemesh.element.src).to.equal(file);
		done();
	});

	it('Should start edgemesh with default options', done => {
		let edgemesh = new Edgemesh();
		assert.isDefined(edgemesh);

		expect(edgemesh.opts.debug).to.equal(false);
		expect(edgemesh.opts.host).to.equal('sig.edgeno.de');
		expect(edgemesh.opts.swPath).to.equal('/');

		done();
	});

	it('Should start in debug mode', done => {
		let edgemesh = new Edgemesh({ debug: true });
		assert.isDefined(edgemesh);
		expect(edgemesh.opts.debug).to.equal(true);
		done();
	});

	it('Should be an event emitter', done => {
		let edgemesh = new Edgemesh();
		assert.isFunction(edgemesh.on);
		assert.isFunction(edgemesh.emit);
		assert.isFunction(edgemesh.once);
		assert.isFunction(edgemesh.off);
		assert.isFunction(edgemesh.listeners);
		assert.isFunction(edgemesh.hasListeners);
		assert.isFunction(edgemesh.removeListener);
		assert.isFunction(edgemesh.removeAllListeners);
		assert.isFunction(edgemesh.removeEventListener);
		done();
	});

	it('Should fire ready event', done => {
		let edgemesh = new Edgemesh();
		edgemesh.on('ready', () => {
			assert.isDefined(window.edgemesh);
			done();
		});
	});
});
