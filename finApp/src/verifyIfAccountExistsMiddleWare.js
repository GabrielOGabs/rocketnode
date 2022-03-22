import accounts from './inMemmoryDataBase.js';

const verifyIfAccountExists = (request, response, next) => {
    const { sinNumber } = request.headers;

    const account = accounts.find(x => x.sinNumber === sinNumber);
    
    if (!account) {
        return request.status(400).json({error: 'Account not found'});
    }

    request.account = account;

    return next();
}

export default verifyIfAccountExists;