const chokidar = require('chokidar');
const fs = require('fs');
const Prism = require('prismjs');
const express = require('express');
const mustache = require('mustache-express');
const app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const port = process.env.PORT || 8080;

//Start the file watcher
const watcher = chokidar.watch('./test.js');
watcher.on('change', path => {
    //trigger change and sync
});

app.get('/', (req, res) => {

    fs.readFile('./test.js', 'utf8', (err, data) => {
        if (err) throw err;

        //let html = Prism.highlight(data, Prism.languages.javascript);
        //html = '<pre><code class="language-javascript">' + html + '</code></pre>';

        //console.log(html);
        res.type('html');
        res.render('index.html', { 'code': '' });
    });
});

app.listen(port).on('error', err => console.log(err));
console.log('Server running @ localhost: ', + port);
