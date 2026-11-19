
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const crypto = require('crypto');

const server = http.createServer((req, res) => {

    if(req.method === 'GET' && req.url === '/'){

        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Rejestracja użytkownika</h1>

            <form method="POST" action="/register">
                <label>Login:
                    <input type="text" name="login" />
                </label><br><br>

                <label>Wiek:
                    <input type="number" name="age" />
                </label><br><br>

                <label>Hasło:
                    <input type="password" name="password" />
                </label><br><br>

                <button type="submit">Zarejestruj</button>
            </form>
        `);

    }else if(req.method === 'POST' && req.url === '/register'){

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const parsedBody = querystring.parse(body);

            const login = parsedBody.login;
            const age = Number(parsedBody.age);
            const password = parsedBody.password;

            if(!login || !Number.isInteger(age) || age < 18 || !password){
                res.writeHead(400, {'Content-Type': 'text/plain; charset=UTF-8'});
                res.end('Nieprawidlowe dane lub użytkownik jest niepełnoletni');
                return;
            }

            if(password.length < 8 ||
               !/[A-Z]/.test(password) ||
               !/[a-z]/.test(password) ||
               !/[0-9]/.test(password) ||
               !/[^A-Za-z0-9]/.test(password)){

                res.writeHead(400, {'Content-Type': 'text/plain; charset=UTF-8'});
                res.end('Hasło jest za słabe! Użyj minimum 8 znaków, dużej i małej litery, cyfry oraz znaku specjalnego.');
                return;
            }

            const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

            const salt = crypto.randomBytes(16).toString('hex');
            const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');

            users.push({
                login: login,
                age: age,
                salt: salt,
                passwordHash: passwordHash
            });

            fs.writeFileSync('users.json', JSON.stringify(users, null, 4));

            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
            res.end(`Użytkownik ${login} został zarejestrowany! <br><a href="/">Powrót</a>`);

        });

    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }

});

server.listen(4000, () => {
    console.log('Server is listening on http://localhost:4000')
});
