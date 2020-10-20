import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import '../container';
import './typeorm';
import routes from './http/routes';

import uploadConfig from '../../config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(400).json({
      status: 'error',
      message: err.message,
    });
  },
);

app.listen(3333, () => {
  console.log('Api is running');
});
