import Edgemesh from '../src';

describe('Edgemesh', () => {

    it('Should create a new Edgemesh instance', (done) => {
        let edgemesh = new Edgemesh();
        assert.isDefined(edgemesh);
        done();
    });

});
