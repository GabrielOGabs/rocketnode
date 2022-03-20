import express from 'express';

const app = express();

app.use(express.json());

app.get("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.get("/courses/:id", (request, response) => {
    return response.json(["Curso 1"]);
});

app.post("/courses", (request, response) => {
    const params = request.body;
    console.log(params);
    return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.put("/courses/:id", (request, response) => {
    return response.json(["Curso 11", "Curso 22", "Curso 33"]);
});

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 1", "Curso 22", "Curso 3"]);
});

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 1", "Curso 3"]);
});

app.listen(3333);