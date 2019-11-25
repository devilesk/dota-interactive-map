require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const sass = require('node-sass');
const CleanCSS = require('clean-css');
const git = require('git-rev-sync');
const fs = require('fs');

sass.render({ file: 'src/scss/app.scss' }, (err, renderedCss) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Css compiled.');
        let contents = renderedCss.css;
        let outFile = 'build/app.css';
        fs.writeFile(outFile, contents, 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`${outFile} was successfully saved.`);
                if (process.env.NODE_ENV === 'production') {
                    const result = new CleanCSS({ rebase: false }).minify(contents).styles;
                    outFile = `build/app-${git.short()}.min.css`;
                    fs.writeFile(outFile, result, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(`${outFile} was successfully saved.`);
                        }
                    });
                }
            }
        });
    }
});