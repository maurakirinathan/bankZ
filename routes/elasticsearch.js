
var PropertiesReader = require('properties-reader');
var elasticsearch = require('elasticsearch');

var properties = PropertiesReader('PropertiesReader.js');
var host = properties.get('db.host');
var elasassandra_port = properties.get('db.elasassandra');


var client_elasticsearch = new elasticsearch.Client({
    host: host+':'+elasassandra_port,
});
