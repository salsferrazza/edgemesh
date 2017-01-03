import Edgemesh from '../src';

describe('Edgemesh', () => {

    it('Should create a script tag', (done) => {

        let file = 'https://unpkg.com/edgemesh/edgemesh.client.min.js';
        let edgemesh = new Edgemesh();
        expect(edgemesh.element.src).to.equal(file);
        done();
    });

    it('Should be an event emitter', (done) => {
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

    it('Should fire ready event', (done) => {
        let edgemesh = new Edgemesh();
        edgemesh.on('ready', () => {
            done();
        });
    });

    it('Should start edgemesh with default options', (done) => {
        let edgemesh = new Edgemesh();
        edgemesh.on('ready', (em) => {
            assert.isDefined(em);
            assert.isDefined(window.edgemesh);

            expect(window.edgemesh.debug).to.be.false;
            expect(em.host).to.equal('sig.edgeno.de');
            expect(window.edgemesh.swPath).to.equal('/');

            done();

        });
    });

    it('Should start in debug mode', (done) => {
        let edgemesh = new Edgemesh({ debug: true })
        edgemesh.on('ready', (em) => {
            expect(em.debug).to.be.true;
            done();
        });
    });

});
