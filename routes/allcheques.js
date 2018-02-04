var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'cchain'});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});

/*
 * GET cheques listing pagging next.
 */
exports.list_paging_next = function (req, res) {

    console.log('allcheques: list');
    var bank_id = req.params.bank_id;
     console.log('bank_id:', bank_id);
    client.execute('SELECT * FROM cheques where token(bank_id) > token('+bank_id+') LIMIT 10', [], function (err, result) {
        if (err) {""
            console.log('allcheques: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allcheques1: list succ:', result.rows);
            res.render('allcheques', {page_title: "BANK Z", data: result.rows})
//console.log("object  "+ result.rows);
        }
    });

};

/*
 * GET cheques listing pagging previous.
 */
exports.list_paging_previous = function (req, res) {

    console.log('allcheques: list');
    var bank_id = req.params.bank_id;
      console.log('bank_id:', bank_id);
    client.execute('SELECT * FROM cheques where token(bank_id) < token('+bank_id+') LIMIT 10', [], function (err, result) {
        if (err) {""
            console.log('allcheques: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('allcheques2: list succ:', result.rows);
            res.render('allcheques', {page_title: "BANK Z", data: result.rows})
        }
    });

};


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
            res.render('allcheques', {page_title: "BANK Z", data: result.rows})
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
                res.render('allcheques', {page_title: "Cheques Details", data: result.rows});
            }
        });
    }
    else
    {
        var result=[];
        res.render('allcheques', {page_title: "Cheques Details", data:result});
    }
};

//SELECT * FROM cheques where token(bank_id) > token('test4') LIMIT  2;
