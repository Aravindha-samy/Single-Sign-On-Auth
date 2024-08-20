import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from './passport_config';
import {GoogleUser} from './types/user'

// src/types/user.d.ts


dotenv.config();


const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Send the user data back to the frontend
    const user = req.user as GoogleUser; 

    res.redirect(`http://localhost:4200/dashboard?user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

app.get('/auth/logout', (req, res,next) => {
  req.logout((err) => {
    if (err) { 
        return next(err); //next
     }
    res.redirect('http://localhost:4200');
  });
});

app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});


