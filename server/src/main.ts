import { config } from './utils/config';
import { errorHandler, limiter, logger, kc, cors } from './utils/middleware';
import { credentialsRouter, gradesRouter } from './routes';
import { healthRouter } from './routes/health';
import express from 'express';

const app = express();

app.set('trust proxy', true);

app.use(logger);
app.use(limiter);
app.use(cors);
app.use(kc.middleware());

app.use('/grades', gradesRouter);
app.use('/credentials', credentialsRouter);
app.use('/health', healthRouter);
app.use(errorHandler);

app.listen(parseInt(config.port), () => console.log(`Running on port ${config.port}`));
