var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});

router.post('/insertLike', function (request, response) {

    connection.query('insert into like values(?,?);',
                  [ request.body.post_id, request.body.mem_id ],function (error, info){
        if(error == null)
        response.json({ result : true, reason : "Success"});
                      
    else      
        response.status(503).json({ result : false, reason : "Invaild process" });
    });
    
});


module.exports = router;