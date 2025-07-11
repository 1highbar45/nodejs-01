import express from "express";
import 'dotenv/config';
import webRoutes from 'src/routes/web';
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT || 8080;

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static files: images/css/js
app.use(express.static('public'))

//config session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))

//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configPassportLocal();

//config global
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});


//config routes
webRoutes(app);

//seeding data
initDatabase();

//handle 404 not found
app.use((req, res) => {
    res.send("404 not found");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
