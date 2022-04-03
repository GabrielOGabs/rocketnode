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

//Deposit money
app.post("/deposit", verifyIfAccountExists, (request, response) => {
    var { ammount } = request.body;

    var operation = {
        id: uuidv4(),
        type: "I",
        value: ammount
    };

    request.account.operations.push(operation);

    response.status(201).send();
});

//Withdraw money
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

//Get current balance
app.get("/account/balance", verifyIfAccountExists, (request, response) => {
    return response.json({ currentBalance: getCurrentBalance(request.account) });
});

//Get current statement
app.get("/account/statement", verifyIfAccountExists, (request, response) => {
    const { account } = request;

    const statement = account.operations.map(x => {
        return { 
            operation : x.type === 'I' ? '+' : '-',
            value : x.value,
            date : x.date
        }
    });

    return response.json(statement);
});

//Delete an account
app.delete("/account", verifyIfAccountExists, (request, response) => {
    const { account } = request;
    const balance = getCurrentBalance(account);

    if (balance !== 0) {
        return response.status(400).json({ errorMessage: "It's not possible to delete accounts with remaining balance" })
    }
    var index = accounts.indexOf(account);
    accounts.splice(index, 1);

    return response.status(201).send();
});

const getCurrentBalance = (account) => {
    return account.operations.reduce((acc, operation) => {
        if (operation.type === "I") acc += operation.value;
        if (operation.type === "O") acc -= operation.value;

        return acc;
    }, 0);
};

app.listen(3333);