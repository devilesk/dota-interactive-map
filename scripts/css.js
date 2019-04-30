require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const sass = require('node-sass');
const CleanCSS = require('clean-css');
const git = require('git-rev-sync');
const fs = require('fs');

sass.render({
    file: 'src/scss/app.scss',
}, (err, renderedCss) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Css compiled.");
        let contents = renderedCss;
        let outFile = 'build/app.css';
        fs.writeFile(outFile, contents, err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`${outFile} was successfully saved.`);
                if (process.env.NODE_ENV === 'production') {
                    contents = new CleanCSS({ rebase: false }).minify(outFile);
                    outFile = `build/app-${git.short()}.min.css`;
                    fs.writeFile(outFile, contents, err => {
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

