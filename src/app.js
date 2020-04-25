const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const findRepository = (id) => {
  return repositories.find(q => q.id === id);
}

const updateRepository = (id, newData) => {
  const index = repositories.indexOf(findRepository(id));

  repositories[index] = newData;
}

app.get("/repositories", (request, response) => {
  // TODO
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    likes: 0,
    url,
    title,
    techs
  };
  
  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { url, title, techs, likes } = request.body;

  const repository = findRepository(id);

  if(!repository) {
    return response.status(400).send('bad request');
  }

  const newRepository = {
    id,
    url,
    title,
    techs,
    likes: repository.likes
  }

  if (likes) {
    newRepository.likes = 0;
  }
  
  updateRepository(id, newRepository);

  return response.status(200).json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = findRepository(id);

  if(!repository) {
    return response.status(400).send('bad request');
  }

  repositories.splice(repositories.indexOf(repository), 1);

  return response.status(204).send('delete');

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repository = findRepository(id);

  if(!repository) {
    return response.status(400).send('bad request');
  }

  repository.likes += 1;

  updateRepository(id, repository);
  return response.status(200).json(repository);

});

module.exports = app;
