import { Router, Request, Response } from 'express';
import { httpClient } from '../utils/axios';
import { Repo } from '../typings/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  try {
    const response = await httpClient.get<Repo[]>({
      url: '/repos'
    });

    const nonForkedRepos = response.filter(repo => !repo.fork);
    console.log('resp', nonForkedRepos);

    res.status(200);
    res.json({
      success: true,
      data: nonForkedRepos,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});
