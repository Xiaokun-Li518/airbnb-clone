import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get ('/test', async (req, res) => {
    res.status(200).send ({
        message: "Hello, there"
    }) 
});


app.listen(4000)
