import express from 'express';
import { verifyToken } from '../middlewares/auth.Middlewares.js';
import { getUserController } from '../controller/user.controller.js';


const app = express();

app.get("/:id", verifyToken, getUserController);


export default app;