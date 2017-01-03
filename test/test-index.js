import Edgemesh from '../src';

describe('Edgemesh', () => {

    it('Should create a new Edgemesh instance', (done) => {
        let edgemesh = new Edgemesh();
        assert.isDefined(edgemesh);
        done();
    });

    it('Should expose edgemesh instance on window', (done) => {
        let edgemesh = new Edgemesh();
        setTimeout(() => {
            assert.isDefined(window.edgemesh);
            done();
        }, 500);
    });

});
