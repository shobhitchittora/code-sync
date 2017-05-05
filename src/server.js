import express from 'express';
'use strict';

import chokidar from 'chokidar';
import Prism from 'prismjs';
import fs from 'fs';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);

//Sanity checks
//--------------------------------------------
const targetFile = process.argv[2];

if (targetFile === undefined) {
    console.error('Target file not specified!');
    process.abort();
}

if (!fs.lstatSync(targetFile).isFile()) {
    console.error('Target is not a file!');
    process.abort();
}

//App settings
//--------------------------------------------
app.use('/assets', express.static('assets'));
const port = 8080;

const watcher = chokidar.watch(targetFile);
watcher.on('change', () => {
    console.log(`File changed!`);

    fs.readFile(targetFile, 'utf8', (err, data) => {
        if (err) throw err;
        io.emit('code', data);
    });


});

app.get('/', (req, res) => {

    fs.readFile(targetFile, 'utf8', (err, data) => {
        if (err) throw err;
        let html = Prism.highlight(data, Prism.languages.javascript);

        const initialState = { code: html };
        const appString = renderToString(<App {...initialState} />);
        res.send(template({
            body: appString,
            title: 'Code Sync',
            initialState: JSON.stringify(initialState)
        }));
    });
});

server.listen(port).on('error', err => console.log(err));
console.log(`Server running @ localhost: ${port}`);

const io = socketio(server);

io.on('connection', client => {
    console.log('Client connected');
});

import opn from 'opn';
opn('http://localhost:8080');

