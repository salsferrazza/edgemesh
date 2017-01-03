import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'src/index.js',
    moduleName: 'Edgemesh',
    format: 'iife',
    dest: 'dist/index.js',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
            preferBuiltins: true
        }),
        babel({
            babelrc: false,
            presets: [ 'es2015-rollup' ],
            plugins: [
                'transform-object-rest-spread',
                'transform-export-extensions'
            ]
        }),
        uglify({ warnings: true })
    ]
};
