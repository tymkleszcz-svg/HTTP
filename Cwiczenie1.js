
const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});

    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const typ = parsedUrl.query.type || 'all';

    if(typ === 'all'){
        res.end(JSON.stringify(data));
    }else if(typ === 'warzywa'){
        res.end(JSON.stringify(data.warzywa));
    }else if(typ === 'owoce'){
        res.end(JSON.stringify(data.owoce));
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(5000, () => {
    console.log('Server is listening on http://localhost:5000')
});
