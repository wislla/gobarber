import express from 'express';
import './database/connection';
import 'reflect-metadata';


import 'express-async-errors';
import routes from './routes';


const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
    console.log('Server on');
})