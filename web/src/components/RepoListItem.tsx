import React from 'react';
import { Repo } from './../typings/Repo';

interface Props {
  repo: Repo;
}

function RepoListItem({ repo }: Props) {
  return <li>{repo.name}</li>;
}

export default RepoListItem;
