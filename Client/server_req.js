var zmq = require('zmq')
    , responder = zmq.socket('rep');

responder.on('message', function(request) {
	console.log("Received request: [", request.toString(), "]");

	// do some 'work'
	setTimeout(function() {

		// send reply back to client.
		responder.send("Bien reçu: "+ request.toString());
	    }, 1000);
    });

responder.bind('tcp://*:5555', function(err) {
	if (err) {
	    console.log(err);
	} else {
	    console.log("Listening on 5555…");
	}
    });

process.on('SIGINT', function() {
	responder.close();
    });