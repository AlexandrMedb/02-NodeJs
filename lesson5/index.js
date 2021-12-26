const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running...`);

    for (let i = 0; i < os.cpus().length; i++) {
        console.log(`Forking process number ${i}`);
        cluster.fork();
    }
} else {
    console.log(`Worker ${process.pid} is running...`);
    const filePath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(filePath);

    const server = http.createServer(((req, res) => {
        setTimeout(() => {
            console.log(`Worker ${process.pid} handling request`);
            res.writeHead(200, 'OK', {
                'Content-Type': 'text/htm',
            });
            readStream.pipe(res);
        }, 5000);
    }));
    server.listen(5555);
}

const filePath = path.join(__dirname, 'index.html');
const readStream = fs.createReadStream(filePath);

const server = http.createServer((req, res) => {
    // res.end('Hello from node.js');
    // console.log('url:', req.url);
    // console.log('method:', req.method);
    // console.log('headers:', req.headers);

    // res.setHeader('some-header', 'some-value');
    // res.writeHead(200, 'Ok!', {
    //     'test-head': 'rest-value',
    // });
    // res.end();

    // URL
    // if (req.url === '/user') {
    //     res.write('User found');
    //     res.end();
    // } else {
    //     res.writeHead(404, 'Not Found');
    //     res.write('User not found');
    //     res.end();
    // }

    // Method
    // if (req.method === 'GET') {
    //     res.write('Hello!');
    //     res.end();
    // } else {
    //     res.writeHead(405, 'Not Allowed');
    //     res.write('Method not allowed');
    //     res.end();
    // }

    // if (req.method === 'POST') {
    //     let data = '';
    //     req.on('data', chunk => data += chunk);
    //     req.on('end', () => {
    //         console.log(data);
    //         console.log(JSON.parse(data));
    //         res.writeHead(200, 'OK', {
    //             'Content-Type': 'application/json',
    //         })
    //         res.end(data);
    //     });
    // }

    // const { query } = url.parse(req.url, true);
    // console.log(query);
    //
    // res.end();

    if (req.method === 'GET') {
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
        });
        readStream.pipe(res);
    }
});

server.listen(5555);


