const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./utils/rateLimit');
const error = require('./middlewares/error');
const appRouter = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(requestLogger);
app.use(appRouter);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
