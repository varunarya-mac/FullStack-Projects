// create express server, port 3000, and body-parser middleware
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import errorhandler from "./middleware/error-handler";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new Error('Route not found');
});

app.use(errorhandler);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));