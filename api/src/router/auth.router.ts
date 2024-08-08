import express from 'express';
import passport from 'passport';
import { Strategy as OAuth2Stratergy } from "passport-google-oauth20"
import { getConfig } from '../config/config.js';
import userModel from '../models/users.model.js';
import { googleAuth, googleAuthCallback, login, logout } from '../controller/auth.controller.js';


const app = express();

const config = getConfig();

// intialize google oauth login
app.get("/google", googleAuth);

app.get("/google/callback", googleAuthCallback);

app.get("/login/sucess", login)

app.get("/logout", logout)

export default app;