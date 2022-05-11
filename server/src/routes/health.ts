import { routerFactory } from '../utils/shared';

export const healthRouter = routerFactory();

healthRouter.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'App is working 👍',
  });
});
