import * as express from 'express';
import * as serveIndex from 'serve-index';
import path from 'path';

function isDirectory(url : string) : boolean {
    return /\/$/.test(url);
}

export function indexHandle(request : express.Request, response : express.Response, next : Function) {
    if (isDirectory(request.url)) {
        request.url = path.join(request.url, 'index.html');
    }
    return next();
}

export function staticFileHandle(serveDir : string) {
    return express.static(serveDir, {
        dotfiles: 'ignore',
        index: false,
        redirect: true
    });
}

export function serveIndexHandle(serveDir : string) {
    return serveIndex(serveDir, {
       icons: true
    });
}
