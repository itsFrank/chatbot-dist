"use strict";
var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('./services/elasticsearch');
var Metrics = require('./services/metrics');
var database_1 = require('./services/database');
var routes_1 = require('./routes');
var config_1 = require('./config');
var app = express();
var env = process.env.CCBOT_ENV;
console.log(env);
var configs = config_1.Config[env];
if (!configs) {
    configs = config_1.Config['production'];
}
var mongo_password = configs.mongo.password;
// const db:string =process.env.CCBOT_DB;
// const host:string = process.env.CCBOT_HOST; //'159.203.32.219'
// const port:number = process.env.CCBOT_PORT;
// const user:string = process.env.CCBOT_USER;
// const password:string = process.env.CCBOT_PWD;
database_1.Database.connect(configs.mongo.host, configs.mongo.port, configs.mongo.database, configs.mongo.username, mongo_password, {}, function () {
    Metrics.initMetrics();
    console.log('mongo connected');
});
elasticsearch.connect(configs.elasticsearch.host, configs.elasticsearch.port, configs.elasticsearch.loglevel);
elasticsearch.pingWait(function () {
    elasticsearch.prepareIndices();
});
//Body to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//Serve static
app.use('/', express.static('../client'));
//mongo-express db manager
//app.use('/mongo_express', mongo_express(mongo_express_config));
var router = express.Router();
//Add routes to app
routes_1.RouteBinder.bind(router);
app.use('/cbot', router);
var server = app.listen(configs.server.port, function () {
    console.log('Listening on port ' + configs.server.port);
});
if (configs.ssl) {
    // sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/priv ate/node-selfsigned.key -out /etc/ssl/certs/node-selfsigned.crt
    https.createServer({
        key: fs.readFileSync(configs.ssl.key_path),
        cert: fs.readFileSync(configs.ssl.cert_path),
        ca: [
            fs.readFileSync(configs.ssl.ca1),
            fs.readFileSync(configs.ssl.ca2),
            fs.readFileSync(configs.ssl.ca3)
        ]
    }, app).listen(configs.ssl.https_port);
}
server.on("error", function (error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof configs.server.port === "string"
        ? "Pipe " + configs.server.port
        : "Port " + configs.server.port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
});
//# sourceMappingURL=server.js.map