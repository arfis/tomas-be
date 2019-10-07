// app.js
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import movieRouter from './routes/movie';
import userRouter from './routes/user';
import passport from 'passport';

import cors from 'cors';

import mongoose from 'mongoose';

let url = "mongodb://127.0.0.1:27017/mydb";


let originsWhitelist = [
    'http://localhost:4201',      //this is my front-end url for development
    'http://www.myproductionurl.com'
];
let corsOptions = {
    origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:false
}

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/movies', movieRouter);
app.use('/user', userRouter);

export default app;
