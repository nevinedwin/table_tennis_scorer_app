import express from 'express';

const app = express();

import testRouter from './test.router.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';


app.use('/test', testRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


export default app;