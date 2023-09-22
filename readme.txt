1.Please create own GIT PAT and paste it in server.js
  -const GITHUB_PAT = 'own_PAT';

2.open terminal and run the code
    -npm install
    -node server.js

3.open url: http://localhost:5000/graphql 
 -click on query on server

4.add query into Operation :
query Query($owner: String!, $name: String!, $username: String!) {
  repository(owner: $owner, name: $name) {
    name
    owner
    description
    url
    size
    isPrivate
    filesCount
    yamlContent
    webhooksCount
  }
  repositories(username: $username) {
    name
    owner
    description
    url
    size
    isPrivate
    filesCount
    yamlContent
    webhooksCount
  }
}

5.Invariable tab add:
{
  "username": "own_github_name",
  "owner": "own_github_name",
  "name": "Repo2",
}

6.REsponse in json
{
  "data": {
    "repository": {
      "name": "Repo2",
      "owner": "nhsanura",
      "description": null,
      "url": "https://github.com/nhsanura/Repo2",
      "size": 24269,
      "isPrivate": false,
      "filesCount": 31,
      "yamlContent": "",
      "webhooksCount": 0
    },
    "repositories": [
      {
        "name": "Repo1",
        "owner": "nhsanura",
        "description": null,
        "url": "https://github.com/nhsanura/Repo1",
        "size": 24266,
        "isPrivate": false,
        "filesCount": 31,
        "yamlContent": "",
        "webhooksCount": 0
      },
      {
        "name": "Repo2",
        "owner": "nhsanura",
        "description": null,
        "url": "https://github.com/nhsanura/Repo2",
        "size": 24269,
        "isPrivate": false,
        "filesCount": 31,
        "yamlContent": "",
        "webhooksCount": 0
      },
      {
        "name": "Repo3",
        "owner": "nhsanura",
        "description": null,
        "url": "https://github.com/nhsanura/Repo3",
        "size": 24263,
        "isPrivate": false,
        "filesCount": 26,
        "yamlContent": "",
        "webhooksCount": 0
      }
    ]
  }
}
