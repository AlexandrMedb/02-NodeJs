const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

const usersList=[];

io.on('connection', client => {

    usersList.push(client.id);
    const payload = {
        userId: client.id,
        message: "подключился",
    };
    client.broadcast.emit('server-msg', payload);
    client.broadcast.emit('userList-msg', {userList:usersList});
    client.emit('userList-msg', {userList:usersList});

    client.on('disconnect', function () {
        let ind=usersList.indexOf(client.id);
        usersList.splice(ind, 1);

        const payload = {
            userId: client.id,
            message: "отключился",
        };
        client.broadcast.emit('server-msg', payload);
        client.broadcast.emit('userList-msg', {userList:usersList});
    });

    client.on('client-msg', (data) => {
        // console.log(data);

        const payload = {
            userId: client.id,
            message: data.message.split('').reverse().join(''),
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });


});




server.listen(5555);
