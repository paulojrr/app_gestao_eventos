import express from 'express';
import 'reflect-metadata';
import '../../container';
import { router } from './routes';

const server = express();

server.use(express.json());
server.use(router);

server.listen(3333, () => console.log('Server running at port 3333'));
