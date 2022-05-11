import { Grades } from '../modules/grades';
import { Scraper } from '../modules/scraper';
import { json, kc } from '../utils/middleware';
import { routerFactory } from '../utils/shared';

export const gradesRouter = routerFactory();

gradesRouter.use(kc.protect());
gradesRouter.use(json);

gradesRouter.get('/', async (req, res, next) => {
  try {
    const { content: authToken } = req.kauth.grant.access_token;

    const grades = await Grades.getGrades(authToken.sub);

    res.status(200).json({ grades });
  } catch (err) {
    next(err);
  }
});

gradesRouter.get('/manual', async (req, res, next) => {
  try {
    const { content: authToken } = req.kauth.grant.access_token;

    await Scraper.one(authToken.sub);
    const grades = await Grades.getGrades(authToken.sub);

    res.status(200).json({ grades });
  } catch (err) {
    next(err);
  }
});
