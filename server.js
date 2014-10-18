var static = require('node-static');

var publicDirectory = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        publicDirectory.serve(request, response);
    }).resume();
}).listen(3000);