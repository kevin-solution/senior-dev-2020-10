import React, { useState, useEffect } from 'react';
import { Repo } from './../typings/Repo';
import { httpClient } from '../utils/axios';

import RepoList from '../components/RepoList';

interface IResponse {
  status: number;
  data: [Repo];
}

function RepoBox() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    (async () => {
      const response = await httpClient.get<IResponse>({
        url: '/repos',
      });

      setRepos(response.data);
    })();
  }, []);

  return (
    <>
      <h3>non-Forked Repositories</h3>
      <RepoList repos={repos} />
    </>
  );
}

export default RepoBox;
