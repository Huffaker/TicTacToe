import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../modules/routes'
import Server from 'socket.io'
import staticFiles from './staticFiles'


function createWebApplication(logging = true) {
    let app = express()

    app.use(compression())

    __dirname = path.resolve();

    // serve our static stuff like index.css
    //app.use(express.static(path.join(__dirname, 'dist'), {index: false}))

   staticFiles(app);


    // send all requests to index.html so browserHistory works
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    })

 

    /* handle SIGTERM and SIGINT (ctrl-c) nicely */
    process.once('SIGTERM', killserver);
    process.once('SIGINT', killserver);

    const io = new Server().attach(8090);

    // store.subscribe(
    //     () => io.emit('state', {})//store.getState().toJS())
    // );

    var sockets = {}, nextSocketId = 0;
    io.on('connection', (socket) => {

        // Add a newly connected socket
        var socketId = nextSocketId++;
        sockets[socketId] = socket;
        console.log('socket', socketId, 'opened');

        //console.log(socket);
        socket.emit('state', {text: "connection test2"})// store.getState().toJS());
        socket.on('action', ()=>{console.log("action recived");})//store.dispatch.bind(store));

        // Remove the socket when it closes
        socket.on('close', function () {
          console.log('socket', socketId, 'closed');
          delete sockets[socketId];
        });
    });

    // close the server and destroy all the open sockets
    function killserver() {
      // Destroy all open sockets
      for (var socketId in sockets) {
        if(sockets[socketId]){
          sockets[socketId].close();
          console.log('socket', socketId, 'destroyed');
        }
      }

    };

    // We need to return a promise so that we can support the base bin/www functionality
    return new Promise((resolve) => {
        resolve(app);
    });
}

export default createWebApplication;