
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Poradnik kulinarny</h1>
            <p>Witaj w naszym poradniku!</p>
            <h2>Wybierz przepis:</h2>
            <a href="/nalesniki">Naleśniki</a><br>
            <a href="/spaghetti">Spaghetti</a>
        `);
    }else if(req.method === 'GET' && req.url === '/nalesniki'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Przepis na naleśniki</h1>
            <h2>Składniki:</h2>
            <ul>
                <li>2 jajka</li>
                <li>1 szklanka mleka</li>
                <li>1 szklanka mąki</li>
                <li>Szczypta soli</li>
            </ul>
            <h2>Przygotowanie:</h2>
            <p>Wymieszaj wszystkie składniki i smaż cienkie naleśniki na patelni.</p>
            <a href="/">Powrót</a>
        `);
    }else if(req.method === 'GET' && req.url === '/spaghetti'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Przepis na spaghetti</h1>
            <h2>Składniki:</h2>
            <ul>
                <li>Makaron spaghetti</li>
                <li>Mięso mielone</li>
                <li>Passata pomidorowa</li>
                <li>Cebula</li>
            </ul>
            <h2>Przygotowanie:</h2>
            <p>Ugotuj makaron. Podsmaż cebulę i mięso, dodaj passatę i wymieszaj z makaronem.</p>
            <a href="/">Powrót</a>
        `);
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.end('Nie znaleziono strony');
    }
});

server.listen(4000, () => {
    console.log('Server is listening on http://localhost:4000')
});
