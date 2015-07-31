var express=require('express');
var app=express();
var http=require('http');
var server=http.createServer(app);
var io3=require('socket.io')(server);


app.use(express.static('./js'));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index2.html');
});

var log_list=[];
var i;

io3.on('connection',function(socket){
	
	console.log(" A user IS CONNECTED");

	socket.on('chat message',function(msg){

		if(log_list.indexOf(msg[1])==-1)
		{

			log_list.push(msg[1]);
		}
		
		var msg1=[];

		msg1.push(msg[0]);
		msg1.push(msg[1]);
		msg1.push(log_list);

		io3.emit('chat message',msg1);
		
	});
	
});

server.listen(9055,function(){

	console.log(" I am listening at 9055");
});
