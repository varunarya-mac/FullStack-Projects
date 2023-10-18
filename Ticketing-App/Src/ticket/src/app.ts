// create express server, port 3000, and body-parser middleware
const express = require('express');
require('express-async-errors');

import cookieSession from "cookie-session";
import { json } from "body-parser";
import { createTicketRouter } from "./routes/__test__/new";
import  errorhandler, { currentUser } from "@va-ticketing/common";

const bodyParser = require('body-parser');
const app = express();
app.set('trust proxy', true);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' // only https connection in prod env,
}));

app.use(currentUser);

// import routes
app.use(createTicketRouter);

app.all('*', async () => {
    throw new Error('Route not found');
});

app.use(errorhandler);

export { app };