import express, { Request, Response, NextFunction } from 'express';
import { Logger } from '../modules/logger';
import { HttpError } from '../types/error';
import { config } from './config';
import { rateLimit } from 'express-rate-limit';
import Keycloak from 'keycloak-connect';
import morgan from 'morgan';
import corsMiddleware from 'cors';

export const kc = new Keycloak({}, config.keycloak);

export const logger = morgan('combined');

export const cors = corsMiddleware({
  credentials: true,
  methods: ['GET', 'POST'],
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export const limiter = rateLimit({
  max: parseInt(config.rateLimit),
  windowMs: 5 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many accounts created from this IP, please try again after an hour',
  },
});

export const json = express.json();

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  Logger.error(err.message);
  const status = (err as HttpError).status || 400;
  res.status(status).send({
    message: err.message,
  });
};
