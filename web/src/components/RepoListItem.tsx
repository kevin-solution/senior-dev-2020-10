import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Repo } from './../typings/Repo';
import { HttpClient } from './../utils/axios';

interface Props {
  repo: Repo;
}

function RepoListItem({ repo }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [readMe, setReadMe] = useState<string>('');

  const showDetail = (fullName: string) => {
    if (!isOpen) {
      (async () => {
        const httpClient = new HttpClient({
          baseURL: 'https://raw.githubusercontent.com',
        });
        const response = await httpClient.get<string>({
          url: `${fullName}/master/README.md`,
        });

        setReadMe(response);
      })();
    }
    setOpen(!isOpen);
  };

  return (
    <li className="repo-list-item" onClick={() => showDetail(repo.fullName)}>
      <p>Name: {repo.fullName}</p>
      <p>Description: {repo.description}</p>
      <p>Language: {repo.language}</p>
      <p>Forks: {repo.forks}</p>
      {isOpen ? (
        <>
          <p>Last Commit: {repo.pushedAt}</p>
          <p>Author: {repo.name}</p>
          {readMe ? (
            <p>
              Read Me: <br />
              <ReactMarkdown>{readMe}</ReactMarkdown>
            </p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </li>
  );
}

export default RepoListItem;
