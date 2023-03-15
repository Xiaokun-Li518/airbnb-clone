import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from './models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';


dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fdasdfwefws342345fgasgasdf23#^$*#@T@$*@#';

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.get ('/test', async (req, res) => {
    res.status(200).send ({
        message: "Hello, there"
    })
});


app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await UserModel.create ({
            name,
            email, 
            password:bcrypt.hashSync(password, bcryptSalt)
        })

        res.json (userDoc)
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await UserModel.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync (password, userDoc.password);
        if (passOk) {
            jwt.sign ({email:userDoc.email, 
                       id:userDoc._id}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json (userDoc);
            });
        }
        else {
            res.status(422).json ("pass not ojbk");
        }
    } else {
        res.json ("not fount");
    }
});

app.get ('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify (token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const userDoc = await UserModel.findById(userData.id);
            const {name, email, _id} = userDoc;
            res.json ({name, email, _id});
        })
    }
})


app.listen(4000)
