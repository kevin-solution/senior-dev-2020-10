import { Router, Request, Response } from 'express';
import { httpClient } from '../utils/axios';
import { Repo } from '../typings/Repo';
// import { AppError } from '../typings/AppError';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  try {
    const response = await httpClient.get<Repo[]>({
      url: '/repos',
    });

    const nonForkedRepos = response.filter((repo) => !repo.fork);

    res.status(200);
    res.json({
      status: 200,
      data: nonForkedRepos,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Interval Error',
    });
  }
});
