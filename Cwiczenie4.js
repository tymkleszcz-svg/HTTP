
const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const id = parsedUrl.query.id;

    const DATA = JSON.parse(fs.readFileSync('data2.json', 'utf8'));

    if(req.method === 'GET' && req.url === '/'){

        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});

        let html = '<h1>Prosty CMS</h1>';

        DATA.artykuly.forEach(artykul => {
            html += `<h2>${artykul.tytul}</h2>`;
            html += `<a href="/?id=${artykul.id}">Czytaj więcej</a><hr/>`;
        });

        res.end(html);

    }else if(req.method === 'GET' && id){

        const artykul = DATA.artykuly.find(a => a.id === Number(id));

        if(artykul){
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});

            res.end(`
                <h1>${artykul.tytul}</h1>
                <p>${artykul.tresc}</p>
                <hr/>
                <a href="/">Powrot</a>
            `);
        }else{
            res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'});
            res.end('Nie znaleziono artykulu');
        }

    }else{
        res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.end('Not Found');
    }

});

server.listen(4000, () => {
    console.log('Server is listening on http://localhost:4000')
});
