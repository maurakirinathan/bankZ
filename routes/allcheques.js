
var cassandra = require('cassandra-driver');
var PropertiesReader = require('properties-reader');

/*var properties = PropertiesReader('PropertiesReader.js');
var host =  properties.get('db.host');
var port = properties.get('db.port');
var keyspace = properties.get('db.keyspace');*/

var host =  process.env.CASSANDRA_HOST;
var port = process.env.CASSANDRA_PORT;
var keyspace = process.env.CASSANDRA_KEYSPACE;


console.log('host: ' +host);
console.log('port: ' +port);

var client = new cassandra.Client({contactPoints: [host+':'+port], keyspace: keyspace});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});


/*
 * GET cheques listing pagging next.
 */
exports.list_paging_next = function (req, res) {

    console.log('allcheques: list');
    var id = req.params.id;

    console.log('id:  ' +id );
    client.execute("SELECT * FROM cheques WHERE id > "+ id + "LIMIT 10 ALLOW FILTERING", [], function (err, result) {
        if (err) {""
            console.log('allcheques: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allcheques1: list succ:', result.rows);
            res.render('allcheques', {page_title: "All Cheques", data: result.rows})

        }
    });

};

/*
 * GET cheques listing pagging previous.
 */
exports.list_paging_previous = function (req, res) {

   console.log('allcheques: list');
    var id = req.params.id;
      console.log('id:', id);
    client.execute("SELECT * FROM cheques WHERE id <"+ id + " LIMIT 10 ALLOW FILTERING", [], function (err, result) {
        if (err) {""
            console.log('allcheques: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allcheques2: list succ:', result.rows);
            res.render('allcheques', {page_title: "All Cheques", data: result.rows})
        }
    });

};

//SELECT * FROM cheques WHERE expr(cheque_lucene_index, '{ sort: [ {type: "simple", field: "id", reverse: true} ] }') AND bank='sampath' AND id < 7a22c8be-0407-11e8-ba89-0ed5f89f718b LIMIT 2 ;

/*
 * GET cheques listing .
 */
exports.list = function (req, res) {

    console.log('allcheques: list');
    client.execute('SELECT * FROM cheques LIMIT 10', [], function (err, result) {
        if (err) {
            console.log('allcheques: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allcheques: list succ:', result.rows);
            res.render('allcheques', {page_title: "All Cheques", data: result.rows})
        }
    });
};

/*
 * GET one cheque detail.
 */
exports.list_one = function (req, res) {

    var id = req.params.id;
    console.log('cheques: viewing one');

    client.execute("SELECT * from cheques WHERE id = " + id + " ALLOW FILTERING", [], function (err, result) {
        if (err) {
            console.log('cheques: viewing one err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('cheques: viewing one succ:');
            res.render('chequeViewOne', {page_title: "Cheque Details", data: result.rows});
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
    console.log('cheques: list_search');
    if (validate(input.id)) {
        client.execute("SELECT * from cheques WHERE id = " + input.id + " ALLOW FILTERING", [], function (err, result) {
            if (err) {
                console.log('cheques: search one err:', err);
                res.status(404).send({msg: err});
                res.render('allcheques', {page_title: "Cheques Details",});
                //  allblocks();
            } else {
                console.log('block: search one succ:');
                res.render('allcheques', {page_title: "Cheque Details", data: result.rows});
            }
        });
    }
    else
    {
        var result=[];
        res.render('allcheques', {page_title: "Cheque Details", data:result});
    }
};

//SELECT * FROM cheques where token(bank_id) > token('test4') LIMIT  2;
