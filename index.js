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

MongoDBStorage.prototype.init = function(loaded) {
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
		if (typeof loaded === 'function') {
			loaded();
		}
	});
}

MongoDBStorage.prototype.loadUsers = function(loaded) {
	this.connection.collection('users', function(error, collection) {
		collection.find().toArray(function(error, results) {
			if (typeof loaded === 'function') {
				loaded(results);
			}
		});
	});
}
