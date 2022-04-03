import express from "express";

const app = express();

app.use(express.json());

app.post("/courses", (request, response) => {
    const { name } = request.body;

    console.log(name);

    response.send(200).json({ message: "Created" });
});

app.listen(3333, () => console.log("Server has started on port 3333"));
