import { Account } from '../modules/account';
import { json, kc } from '../utils/middleware';
import { routerFactory } from '../utils/shared';

export const credentialsRouter = routerFactory();

credentialsRouter.use(kc.protect());
credentialsRouter.use(json);

credentialsRouter.get('/', async (req, res, next) => {
  try {
    const { content: authToken } = req.kauth.grant.access_token;
    const login = await Account.getLogin(authToken.sub);

    if (login) {
      res.status(200).send({
        url: login.url,
        pin: login.pin,
      });
    } else {
      res.status(404).send({
        message: 'No login found. Please set one first',
      });
    }
  } catch (err) {
    next(err);
  }
});

credentialsRouter.post('/', async (req, res, next) => {
  try {
    const url = req.body.url;
    if (!url) throw new Error('No url found');

    const pin = req.body.pin;
    if (!pin) throw new Error('No pin found');

    const { content: authToken } = req.kauth.grant.access_token;
    Account.setLogin(authToken.sub, url, pin);

    res.status(200).send({
      message: 'Successfully set your credentials',
    });
  } catch (err) {
    next(err);
  }
});
