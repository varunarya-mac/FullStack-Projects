// create express server, port 3000, and body-parser middleware
const express = require('express');
require('express-async-errors');


import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import errorhandler from "./middleware/error-handler";

import cookieSession from "cookie-session";

const bodyParser = require('body-parser');
const app = express();
app.set('trust proxy', true);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' // only https connection in prod env,
}));

app.all('*', async () => {
    throw new Error('Route not found');
});

app.use(errorhandler);

export { app };