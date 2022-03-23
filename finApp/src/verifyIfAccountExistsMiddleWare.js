import accounts from './inMemmoryDataBase.js';

const verifyIfAccountExists = (request, response, next) => {
    const { sinnumber } = request.headers;

    const account = accounts.find(x => x.sinNumber == sinnumber);
    
    if (!account) {
        return response.status(400).json({error: 'Account not found'});
    }

    request.account = account;

    return next();
}

export default verifyIfAccountExists;