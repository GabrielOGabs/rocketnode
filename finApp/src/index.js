import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const customers = [];

app.use(express.json());

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;
    const id = uuidv4();
    const customer = {
        cpf: cpf,
        name: name,
        id: id
    };
    customers.push(customer);

    return response.json(customer);
});

app.listen(3333);