import Edgemesh from '../src';

describe('Edgemesh', () => {

    it('Should create a new Edgemesh instance', (done) => {
        let edgemesh = Edgemesh();
        assert.isDefined(edgemesh);
        edgemesh.then((em) => {
            assert.isDefined(em);
            assert.isDefined(window.edgemesh);
            expect(em.debug).to.be.false;
            done();
        });
    });

    it('Should start in debug mode', (done) => {
        let edgemesh = Edgemesh({ debug: true })
            .then((em) => {
                expect(em.debug).to.be.true;
                done();
            });
    });

    it('Should start with custom client path', (done) => {
        let url = 'sig.edgeno.de';
        let edgemesh = Edgemesh({ client: url })
            .then((em) => {
                // TODO: Pass client option through to core
                done();
            });
    });

    it('Should start with custom host path', (done) => {
        let url = 'test.edgemesh.com';
        let edgemesh = Edgemesh({ host: url })
            .then((em) => {
                console.log('\n\n\n', em, '\n\n\n');
                expect(em.host).to.equal(url);
                done();
            });
    });

    it('Should start with custom service worker path', (done) => {
        let url = 'test.edgemesh.com';
        let edgemesh = Edgemesh({ swPath: url })
            .then((em) => {
                console.log(em.swPath);
                expect(em.swPath).to.equal(url);
                done();
            });
    });

});
