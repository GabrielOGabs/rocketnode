# Welcome to FinApp!

Hi! this project consists in an REST API created in Node.Js with Express framework to simulate bank operations.


## Objectives
In the banking simulation environment we will use an in-memmory database (which is just an array of Accounts object)

#### The API must be able to:
 - [ ] Create a new account
 - [ ] Edit account information
 - [ ] Delete an account
 - [ ] Deposit cash
 - [ ] Withdraw cash
 - [ ] Retrieve a Statement
 - [ ] Retrieve the current Balance

#### Business Rule
- [ ] It's not possible to create more than one account for the same SIN number
- [ ] It's not possible to remove an account where a SIN number doesn't exists
- [ ] It's not possible to remove an account if balance different than 0
- [ ] It's not possible to withdraw cash if not enough balance
- [ ] All the responses must come with the appropriate HTTP Response code
- [ ] All API verbs must be respected

### Testing the API
To test the API it's preferable to use an API tester like PostMan or Insomnia. In this case I'm using Insomnia and there is a collection file to download and import on insomnia app to make tests easier.