import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import BooksRoute from "./routes/BooksRoute.js";
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

// Enable CORS
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());

// Define routes
app.use('/books', BooksRoute);

// Welcome route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack.');
});

mongoose.connect(mongoURL)
    .then(() => {
        console.log('App connected to the database.');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
