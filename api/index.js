import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from './models/User.js'
import bcrypt from 'bcryptjs'



dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
app.use(express.json());


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

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
        res.json("found");
    } else {
        res.json ("not fount");
    }
}); 

app.listen(4000)
