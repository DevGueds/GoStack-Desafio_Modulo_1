const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');
const app = express();
app.use(express.json());
app.use(cors());
const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  }
  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).send('Repository not found.')
  }
  const { title, url, techs } = request.body;
  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;
  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).send("Respository not found.");
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send("");
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).send('Repository not found.')
  }
  const { title, url, techs } = repositories[repositoryIndex];
  const likes = repositories[repositoryIndex].likes + 1;
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  }
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

module.exports = app;
