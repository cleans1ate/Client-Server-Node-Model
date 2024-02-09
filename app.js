const express = require('express')
const tls = require('tls');
const https = require('https')
const path = require('path')
const fs = require('fs')

const options = { 
  key: fs.readFileSync(path.join(__dirname, 'cert','server-key.pem')), 
  cert: fs.readFileSync(path.join(__dirname, 'cert','server-crt.pem')), 
  ca: fs.readFileSync(path.join(__dirname, 'cert','ca-crt.pem')), 
  requestCert: true, 
  rejectUnauthorized: true
}; 

const sslServer = tls.createServer(options, (socket) => {
  console.log('server connected', 
      socket.authorized ? 'authorized' : 'unauthorized');
  
  socket.on('error', (error) => {
      console.log(error);
  });
  
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(process.stdout);
  socket.pipe(socket);
});

sslServer.listen(8000, () => {
  console.log('server bound');
});
