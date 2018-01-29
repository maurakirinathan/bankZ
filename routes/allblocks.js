var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'cchain'});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});

/*
 * GET blocks listing.
 */
exports.list = function (req, res) {

    console.log('allblocks: list');
    client.execute('SELECT * FROM blocks', [], function (err, result) {
        if (err) {
            console.log('allblocks: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allblocks: list succ:', result.rows);
            res.render('allblocks', {page_title: "BANK Z", data: result.rows})
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
            res.render('blockViewOne', {page_title: "Bslock Details", data: result.rows});
        }
    });

};
