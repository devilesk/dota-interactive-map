var yaml = require('js-yaml');
var fs = require('fs');
require("jinjs").registerExtension(".j2", function (txt, x) { 
    return '{% extends "./template.tpl" %}' + txt; 
});
require("jinjs").registerExtension(".tpl");

var context = yaml.safeLoadAll(fs.readFileSync('src/template/template_data.yaml', 'utf8'))[0];
var my_template = require("../src/template/index.j2");
var result = my_template.render(context);

fs.writeFile('src/index.html', result, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File was successfully saved.");
    }
});