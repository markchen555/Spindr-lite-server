import express from 'express';
import HTTPStatus from 'http-status';
import parser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import constants from './config/constants';
import '../db/db';
import routes from './routes';

// Initial exprss server
const app = express();

app.use(cors());
app.use(parser.json()); // support json encoded bodies
app.use(parser.urlencoded({ extended: true })); // support encoded bodies
app.use(morgan('dev'));

// Router
app.use('/api/v1', routes);

// HTTP listener
app.listen(constants.PORT, err => {
  if (err) {
    console.log(`Error Code: ${HTTPStatus.NOT_FOUND}`);
  } else {
    console.log(`
        ---
        Status Code: ${HTTPStatus.OK}
        ---
        Listening on port ${constants.PORT}
        ---
    `);
  }
})