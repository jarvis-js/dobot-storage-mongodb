var mongodb = require('mongodb');

module.exports = MongoDBStorage;

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

MongoDBStorage.prototype.init = function(callback) {
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
		callback();
	});
}

MongoDBStorage.prototype.load = function(key, callback) {
	this.connection.collection(key, function(error, collection) {
		collection.find().toArray(function(error, results) {
			callback(results);
		});
	});
}

MongoDBStorage.prototype.save = function(key, data, callback) {
	this.connection.collection(key, function(error, collection) {
		collection.remove(function() {
			collection.insert(data, {safe: true}, function() {
				if (callback) {
					callback();
				}
			});
		});
	});
}
