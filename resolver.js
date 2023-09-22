const axios = require('axios');
const resolvers = {
    Query: {
      repositories: async (_, { username }, { headers }) => {
        try {
          const response = await axios.get(`https://api.github.com/users/${username}/repos`, { headers });
          const repositories = response.data;
          
          // Limit the number of parallel requests to 2
          const maxParallelRequests = 2;
          const promises = [];
          
          for (let i = 0; i < repositories.length; i += maxParallelRequests) {
            const chunk = repositories.slice(i, i + maxParallelRequests);
            const chunkPromises = chunk.map(async (repo) => {
              const details = await fetchRepositoryDetails(repo.owner.login, repo.name, headers);
              console.log('-------details------>>',details)
              console.log('-------repo------>>',repo)

              return {
                name: repo.name,
                owner: repo.owner.login,
                description: repo.description,
                url: repo.html_url,
                size: repo.size,
                isPrivate: repo.private,
                filesCount: details.filesCount,
                yamlContent: details.yamlContent,
                webhooksCount: details.webhooksCount,
              };
            });
            promises.push(...chunkPromises);
          }
  
          const repositoryDetails = await Promise.all(promises);
          return repositoryDetails;
        } catch (error) {
            console.log("errorr----",error)
          throw new Error('Error fetching repositories',error);
        }
      },
      repository: async (_, { owner, name }, { headers }) => {
        try {
          return fetchRepositoryDetails(owner, name, headers);
        } catch (error) {
          throw new Error('Error fetching repository details');
        }
      },
    },
  };
  
  async function fetchRepositoryDetails(owner, name, headers) {
    const [repoResponse, contentsResponse, webhooksResponse] = await Promise.all([
      axios.get(`https://api.github.com/repos/${owner}/${name}`, { headers }),
      axios.get(`https://api.github.com/repos/${owner}/${name}/contents`, { headers }),
      axios.get(`https://api.github.com/repos/${owner}/${name}/hooks`, { headers }),
    ]);
  
    const repo = repoResponse.data;
    const contents = contentsResponse.data;
    const webhooks = webhooksResponse.data;
  
    const yamlContent = contents.find((file) => file.name.endsWith('.yml'))?.content || '';
  
    return {
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      url: repo.html_url,
      size: repo.size,
      isPrivate: repo.private,
      filesCount: contents.length,
      yamlContent: Buffer.from(yamlContent, 'base64').toString(),
      webhooksCount: webhooks.length,
    };
  }
  
  module.exports = resolvers;
  