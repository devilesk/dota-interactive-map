import babel from 'rollup-plugin-babel';

export default {
    input: 'src/js/generateGeoJson.js',
    output: {
        file: 'scripts/generateGeoJson.js',
        format: 'cjs',
    },
    plugins: [
        babel(),
    ],
};
