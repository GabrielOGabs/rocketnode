import express from 'express';
import { v4 } from 'uuid';
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

//Deposit money
app.post("/deposit", verifyIfAccountExists, (request, response) => {
    var { ammount } = request.body;

    var operation = {
        id: v4(),
        type: "I",
        value: ammount
    };

    request.account.operations.push(operation);

    response.status(201).send();
});

//Deposit money
app.post("/withdraw", verifyIfAccountExists, (request, response) => {
    var { ammount } = request.body;

    var balance = getCurrentBalance(request.account);

    if (balance < ammount) {
        return response.status(400).json({errorMessage: "Not enough balance."});
    }

    var operation = {
        id: v4(),
        type: "O",
        value: ammount
    };

    request.account.operations.push(operation);

    response.status(201).send();
});


app.listen(3333);