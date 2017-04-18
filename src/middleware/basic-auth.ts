import * as basicAuth from 'express-basic-auth';

export default function basicAuthHandler(username: string, password: string) {
    return basicAuth({
        authorizer:
            (reqUsername: string, reqPassword: string) => reqUsername === username && reqPassword === password,
        challenge: true
    });
}
