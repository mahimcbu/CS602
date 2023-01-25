const net = require('net');

const colors = require('colors');

const cities = require('./zipCodeModule_v2');

const server = net.createServer((socket) => {

	console.log("Client connection...".red);

	socket.on('end', () => {
		console.log("Client disconnected...".red);
	});

	// HW Code - Write the following code to process data from client
	
	socket.on('data', (data) => {

		let input = data.toString()
		let inputSplit = input.trim().split(",");
		let command = inputSplit[0].trim();
		let params = inputSplit.slice(1);
		console.log(colors.blue('...Received %s'), input);

		// Fill in the rest
		// let myjson = JSON.stringify(input);
		// let test = JSON.parse(myjson)
		switch(command){
			case 'lookupByZipCode':
				let byZip = cities.lookupByZipCode(params[0]);
				if (byZip)	socket.write(JSON.stringify(byZip));
				else socket.write("Invalid zip code");
				break;
      		case 'lookupByCityState':
				let byCityState=cities.lookupByCityState(params[0],params[1]);
				socket.write(JSON.stringify(byCityState));
				break;
      		case 'getPopulationByState':
				let getPop= cities.getPopulationByState(params[0]);
				socket.write(JSON.stringify(getPop));
				break;
      		default:
				socket.write("Invalid Request");
       			break;
    
	}


	});

});

// listen for client connections
server.listen(3000, () => {
	console.log("Listening for connections on port 3000");
});
