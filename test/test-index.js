import Edgemesh from '../src';

describe('Edgemesh', () => {

	const HOST = 'sig.edgeno.de';

	it('Should create a script tag', done => {
		let file = `https://${HOST}/edgemesh.client.min.js`;
		let edgemesh = new Edgemesh();
		assert.isDefined(edgemesh);
		expect(edgemesh.element.src).to.equal(file);
		done();
	});

	it('Should start edgemesh with default options', done => {
		let edgemesh = new Edgemesh();
		assert.isDefined(edgemesh);

		expect(edgemesh.opts.client).to.equal(HOST);
		expect(edgemesh.opts.host).to.equal(HOST);
		expect(edgemesh.opts.swPath).to.equal('/');
		expect(edgemesh.opts.externalMount).to.equal(false);

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
