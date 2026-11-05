import {readFileSync,writeFileSync} from 'node:fs';
const path='dist/index.html';
let html=readFileSync(path,'utf8').replace('<html lang="en">','<html lang="pt-BR">').replace('You need to enable JavaScript to run this app.','Ative o JavaScript para abrir o diário alimentar.').replace('</head>','<link rel="icon" href="./favicon.svg" type="image/svg+xml"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default"></head>');
writeFileSync(path,html);

writeFileSync("dist/.nojekyll", "");
