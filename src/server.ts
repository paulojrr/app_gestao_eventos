import express from 'express';
import 'reflect-metadata';
import { router } from './routes';
import './shared/container';

const server = express();

server.use(express.json());
server.use(router);

server.listen(3333, () => console.log('Server running at port 3333'));
