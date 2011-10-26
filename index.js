var util = require('util');
var mongodb = require('mongodb');

module.exports = MongoDBStorage;

util.inherits(MongoDBStorage, process.EventEmitter);

function MongoDBStorage(options) {
	var defaults = {
		database: 'dobot',
		host: 'localhost',
		port: 27017,
		database_options: {},
		server_options: {}
	};

	this.options = defaults;
	for (var key in options) {
		this.options[key] = options[key];
	}

	this.connection = null;
}

MongoDBStorage.prototype.init = function() {
	var self = this;
	var db = new mongodb.Db(this.options.database,
	                        new mongodb.Server(this.options.host, this.options.port, this.options.server_options),
	                        this.options.database_options);
	db.open(function(error, connection) {
		if (error) {
			console.log('MongoDB Error (' + error.errno + '): ' + error.message);
			process.exit(error.errno);
		}
		self.connection = connection;
		self.emit('storage_initialised');
	});
}

MongoDBStorage.prototype.loadUsers = function() {
	var self = this;
	this.load('users', function(users) {
		self.emit('storage_users_loaded', users);
	});
}

MongoDBStorage.prototype.load = function(key, callback) {
	this.connection.collection(key, function(error, collection) {
		collection.find().toArray(function(error, results) {
			callback(results);
		});
	});
}
