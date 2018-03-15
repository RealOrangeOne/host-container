require('ts-node/register');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.expect();
chai.use(chaiAsPromised);

process.env.NODE_ENV = 'test';
