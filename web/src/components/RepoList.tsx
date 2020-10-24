import React from 'react';
import RepoListItem from './RepoListItem';

import { Repo } from '../typings/Repo';

interface Props {
  repos: Repo[];
}

function RepoList({ repos }: Props) {
  return (
    <ul>
      {repos.map((repo) => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </ul>
  );
}

export default RepoList;
