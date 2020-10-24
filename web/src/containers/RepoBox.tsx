import React, { useState, useEffect } from 'react';
import { Repo } from './../typings/Repo';
import { httpClient } from '../utils/axios';

import RepoList from '../components/RepoList';

interface IResponse {
  status: number;
  data: [Repo];
  message: string;
}

function RepoBox() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await httpClient.get<IResponse>({
        url: '/repos',
      });

      setLoading(false);

      if (response.status === 200) {
        setRepos(
          response.data.sort((repoA, repoB) => {
            const dateA = new Date(repoA.createdAt).getTime();
            const dateB = new Date(repoB.createdAt).getTime();

            return dateA < dateB ? 1 : -1;
          })
        );
      } else {
        setError(response.message);
      }
    })();
  }, []);

  return (
    <div className="repo-box">
      <h3>Non-Forked Repositories</h3>
      {isLoading ? (
        <h5>Loading...</h5>
      ) : error ? (
        <h5>{error}</h5>
      ) : (
        <RepoList repos={repos} />
      )}
    </div>
  );
}

export default RepoBox;
