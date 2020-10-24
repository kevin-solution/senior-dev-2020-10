import React from 'react';
import { Repo } from './../typings/Repo';

interface Props {
  repo: Repo;
}

function RepoListItem({ repo }: Props) {
  return (
    <li className="repo-list-item">
      <p>Name: {repo.name}</p>
      <p>Description: {repo.description}</p>
      <p>Language: {repo.language}</p>
      <p>Forks: {repo.forks}</p>
    </li>
  );
}

export default RepoListItem;
