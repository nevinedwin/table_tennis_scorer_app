import express from 'express';

const app = express();

import testRouter from './test.router.js';
import authRouter from './auth.router.js';


app.use('/test', testRouter);
app.use('/auth', authRouter);


export default app;