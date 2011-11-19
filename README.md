# MongoDB Storage

Store bot data in a MongoDB database.

## Configuration

### [database]

Name of the database to store data in.  Defaults to `dobot`.

### [host]

Hostname of the MongoDB server.  Defaults to `localhost`.

### [port]

Port of the MongoDB server.  Defaults to `27017`.

### [server_options]

The MongoDB connection is provided by [node-mongodb-native](https://github.com/christkv/node-mongodb-native).  See the `Server options` section of the [documentation](https://github.com/christkv/node-mongodb-native/blob/master/docs/database.md).  No custom options are set by default.

### [database_options]

The MongoDB connection is provided by [node-mongodb-native](https://github.com/christkv/node-mongodb-native).  See the `DB options` section of the [documentation](https://github.com/christkv/node-mongodb-native/blob/master/docs/database.md).  No custom options are set by default.
