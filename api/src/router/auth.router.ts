import express from 'express';
import { googleAuth } from '../controller/auth.controller.js';


const app = express();

app.post("/google", googleAuth);


export default app;