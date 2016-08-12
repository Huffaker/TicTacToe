import express from 'express';
import path from 'path';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../modules/routes';
import Server from 'socket.io';
import staticFiles from './staticFiles';
import makeStore from '../src/store';
import uuid from 'node-uuid';
import cleanState from '../src/clean_client_state';

function createWebApplication(logging = true) {
    let app = express()

    app.use(compression())

    __dirname = path.resolve();

    // serve our static stuff like index.css
    //app.use(express.static(path.join(__dirname, 'dist'), {index: false}))

   staticFiles(app);

    // send all requests to index.html
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    })

    /* handle SIGTERM and SIGINT (ctrl-c) nicely */
    process.once('SIGTERM', killserver);
    process.once('SIGINT', killserver);


    const store = makeStore();

    store.dispatch({ type: 'RESET' });

    const io = new Server().attach(8090);

    var sockets = {};
    io.on('connection', (socket) => {

        // Add a newly connected socket
        var socketId = uuid.v4();
        sockets[socketId] = socket;
        console.log('socket', socketId, 'opened');

        // Add player to game
        store.dispatch({
            type: 'ADD_SOCKET',
            meta: {remote: false},
            socketId: socketId
        });

        console.log(store.getState());
        console.log(cleanState(store.getState(), socketId));
        // Send new player the current state
        socket.emit('state', cleanState(store.getState(), socketId).toJS());

        // Subscribe new player to any changes in state
        socket.on('action',(action) => {
            action.socketId = socketId;
            action.meta = { remote: true};
            console.log(action);
            store.dispatch(action);
        });

        store.subscribe(
            () => {
              console.log('Emit new State: ' + store.getState());
              socket.emit('state', cleanState(store.getState(), socketId).toJS())
            }
        );

        // Remove the socket when it closes
        socket.on('disconnect', () => {
          console.log('socket', socketId, 'closed');
          // Remove disconnected player from game
          store.dispatch({
              type: 'REMOVE_PLAYER',
              meta: {remote: false},
              playerId: socketId
          });
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