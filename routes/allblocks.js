var cassandra = require('cassandra-driver');
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('PropertiesReader.js');
var host =  properties.get('db.host');
var port = properties.get('db.port');
var keyspace = properties.get('db.keyspace');

/*

var host =  process.env.CASSANDRA_HOST;
var port = process.env.CASSANDRA_PORT;
var keyspace = process.env.CASSANDRA_KEYSPACE;
*/



console.log('host: ' +host);
console.log('port: ' +port);


var client = new cassandra.Client({contactPoints: [host+':'+port], keyspace: keyspace});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});




/*
 * GET blocks listing.
 */
exports.list = function (req, res) {

    console.log('allblocks: list');
    client.execute('SELECT * FROM blocks LIMIT 10', [], function (err, result) {
        if (err) {
            console.log('allblocks: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allblocks: list succ:', result.rows);
            res.render('allblocks', {page_title: "All Blocks", data: result.rows})
        }
    });

};

/*
 * GET one block.
 */
exports.list_one = function (req, res) {

    var id = req.params.id;
    console.log('block: viewing one');

    client.execute("SELECT * from blocks WHERE id = " + id + " ALLOW FILTERING", [], function (err, result) {
        if (err) {
            console.log('block: viewing one err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('block: viewing one succ:');
            res.render('blockViewOne', {page_title: "Block Details", data: result.rows});
        }
    });

};


/*
 * GET one block.
 */
exports.list_search = function (req, res) {

    // var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));

    var validate = require('uuid-validate');


        console.log(input);
    console.log('block: list_search');
    if (validate(input.id)) {
        client.execute("SELECT * from blocks WHERE id = " + input.id + " ALLOW FILTERING", [], function (err, result) {
            if (err) {
                console.log('block: search one err:', err);
                res.status(404).send({msg: err});
                res.render('allblocks', {page_title: "Block Details",});
                //  allblocks();
            } else {
                console.log('block: search one succ:');
                res.render('allblocks', {page_title: "Block Details", data: result.rows});
            }
        });
    }
    else
    {
         var result=[];
        res.render('allblocks', {page_title: "Block Details", data:result});
    }
};



/*
 * GET cheques listing pagging next.
 */
exports.list_paging_next = function (req, res) {

    console.log('allblocks: list');
    var id = req.params.id;

    console.log('id:  ' +id );
    client.execute("SELECT * FROM blocks WHERE id > "+ id + "LIMIT 10 ALLOW FILTERING", [], function (err, result) {
        if (err) {""
            console.log('allblocks: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allblocks: list succ:', result.rows);
            res.render('allblocks', {page_title: "All Blocks", data: result.rows})

        }
    });

};

/*
 * GET cheques listing pagging previous.
 */
exports.list_paging_previous = function (req, res) {

    console.log('allblocks: list');
    var id = req.params.id;
    console.log('id:', id);
    client.execute("SELECT * FROM blocks WHERE expr(block_lucene_index," +"\'{ sort: [ {type: \"simple\", field: \"id\", reverse: true} ] }"+"\') AND bank='sampath' AND id <"+ id + " LIMIT 10 ALLOW FILTERING", [], function (err, result) {

        if (err) {""
            console.log('allblocks: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allblocks: list succ:', result.rows);
            res.render('allblocks', {page_title: "All Blocks", data: result.rows})
        }
    });

};

