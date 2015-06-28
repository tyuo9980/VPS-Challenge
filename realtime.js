function generateWattage(){
	return (Math.random() * 300).toFixed(1);
}

function updateInterval(){
	return (200 + Math.random() * 800).toFixed(0);
}

var http = require('http');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function(request, response){
	console.log('connection');

    fs.readFile('dashboard.html',function (err, data){
        response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        response.write(data);
        response.end();
    });
});

server.listen(8000);
io = io.listen(server);
io.sockets.on('connection', function(socket){
	var interval = updateInterval();

    var callback = function(){
        socket.emit('wattage', {'sent': new Date().getTime(), 'wattage': generateWattage(), 'interval': interval});
        interval = updateInterval();
        setTimeout(callback, interval);
    }

    setTimeout(callback, interval);
});
