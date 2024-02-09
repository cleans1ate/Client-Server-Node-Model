const express = require('express')
const tls = require('tls');
const https = require('https')
const path = require('path')
const fs = require('fs')

const options = {
    ca: fs.readFileSync(path.join(__dirname, 'cert','ca-crt.pem')),
    key: fs.readFileSync(path.join(__dirname, 'cert','client1-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert','client1-crt.pem')),
    host: 'localhost',
    port: 8000,
    rejectUnauthorized:true,
    requestCert:true
};

const socket = tls.connect(options, () => {
    console.log('client connected', 
        socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
});

socket.setEncoding('utf8');

socket.on('data', (data) => {
    console.log(data);
});

socket.on('error', (error) => {
    console.log(error);
});

socket.on('end', (data) => {
    console.log('Socket end event');
});