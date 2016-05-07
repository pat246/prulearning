var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec;
var pty = require('pty.js');
var child;
var rootDir = process.env.HOME + '/Documents/workspace_uw/compiler-nj';

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');

	// Create terminal
	var term = pty.spawn('sh', [], {
		name : 'xterm-color',
		cols : 80,
		rows : 30,
		cwd : rootDir,
		env : process.env
	});
	console.log('home dir: ' + process.env.HOME);
	// Listen on the terminal for output and send it to the client
	term.on('data', function(data) {
		console.log('data out ->' + data);
		socket.emit('data', data);
	});

	// When socket disconnects, destroy the terminal
	socket.on("disconnect", function() {
		term.destroy();
		console.log("bye");
	});

	socket.on('data', function(msg) {
		if (msg.sessionid != null) {
			var javaFile = 'codes/java/' + msg.sessionid + '/HelloWorld.java';
			var classPath = 'codes/java/' + msg.sessionid;
			if (msg.command == 'cmd-compile') {
				term.write("javac " + javaFile);
			} else if (msg.command == 'cmd-execute') {
				term.write("java -classpath  " + classPath + " HelloWorld");
			}
		} else {
			term.write(msg);
		}
	});

	// Listen on the terminal for output and send it to the client
	term.on('data', function(data) {
		socket.emit('output', data);
	});
	// Listen on the client and send any input to the terminal
	socket.on('input', function(data) {
		term.write(data);
	});
	// When socket disconnects, destroy the terminal
	socket.on("disconnect", function() {
		term.destroy();
		console.log("bye");
	});

});

http.listen(3000, function() {
	console.log('listening on *:3000 -- java compiler');
});
