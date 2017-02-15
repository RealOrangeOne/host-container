import basicAuth from 'express-basic-auth';

export default function basicAuthHandler(username : string, password : string) {
    return basicAuth({
        authorizer: (req_username : string, req_password : string) => req_username === username && req_password === password,
        challenge: true
    });
}
