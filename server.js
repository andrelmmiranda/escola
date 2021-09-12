const express = require('express');
const server = express();
const consign = require('consign')
const port = 3000;

server.set('view engine', 'ejs');
server.set('views', `${__dirname}/view`);
server.use(express.urlencoded({ extend: true }));
server.use(express.json());
server.use("/public", express.static('./public/'));

consign().include('routes').into(server);

server.listen(port, ()=>{
    console.log(`On-line na porta:${port}.`);
});