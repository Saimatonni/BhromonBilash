/* eslint-disable import/first */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
dotenv.config();
import config from './config';
import passport from "passport"
import { instrument } from '@socket.io/admin-ui';
import http from 'http';
import { Server } from 'socket.io';
import expressSession from "express-session"

import { notFound, converter, handler } from './middleware/error';
import { onClientConnection } from './sockets/socketEvents';

// Database connection
// Application modules
import routes from './routes';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './config/firebase';
import { abc } from './config/database';


abc()
initializeApp(firebaseConfig)



const app = express();

// Cors Origin Access Setup
app.use(cors());
app.options('*', cors());

// Routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));


app.use(expressSession({ secret:process.env.EXPRESS_SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize());
app.use(passport.session())

app.use('/api/', routes);

// Error Handler Stack.
app.use(converter);
app.use(notFound);
app.use(handler);

const server = http.createServer(app);

const socketIO = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://admin.socket.io',
      'http://localhost:3001',
      // process.env.FRONTEND_URL as string
    ]
  }
});

// any new incoming client connection
socketIO.on('connection', onClientConnection);

server.listen(config.port, () => {
  console.info('\x1b[44m\x1b[1m Listening on port    : \x1b[0m ', config.port);
  console.info('\x1b[44m\x1b[1m Running environment  : \x1b[0m ', config.env);
});

instrument(socketIO, { auth: false });
