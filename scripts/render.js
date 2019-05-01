const yaml = require('js-yaml');
const fs = require('fs');
require('jinjs').registerExtension('.j2', (txt, x) => `{% extends "./template.tpl" %}${txt}`);
require('jinjs').registerExtension('.tpl');

const context = yaml.safeLoadAll(fs.readFileSync('src/template/template_data.yaml', 'utf8'))[0];
const myTemplate = require('../src/template/index.j2');

const result = myTemplate.render(context);
const outFile = 'src/template/index.html';
fs.writeFile(outFile, result, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`${outFile} was successfully saved.`);
    }
});
