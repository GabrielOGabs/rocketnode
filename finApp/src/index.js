import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import accounts from './inMemmoryDataBase.js';
import verifyIfAccountExists from './verifyIfAccountExistsMiddleWare.js'

const app = express();

app.use(express.json());

//Get All accounts (Makes it easier to debug)
app.get("/account", (request, response) => {
    return response.json(accounts);
});

//Create an account
app.post("/account", (request, response) => {
    const { sinNumber, name, birthDate } = request.body;

    const account = {
        sinNumber,
        name,
        birthDate,
        operations: [] 
    }

    accounts.push(account);

    return response.status(201).send();
});

//Update an account
app.put("/account", verifyIfAccountExists, (request, response) => {
    const { name, birthDate } = request.body;

    const account = request.account;

    if(name)
    {
        account.name = name;
    }

    if(birthDate)
    {
        account.birthdate = birthDate;
    }

    return response.status(200).send();
});

app.listen(3333);