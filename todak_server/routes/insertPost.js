var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});

router.post('/insertPost', function (request, response) {

    connection.query('insert into post( mem_id, text, photo, post_date, keyword1, keyword2, keyword3) values(?,?,?,sysdate,?,?,?);',
                  [ request.body.mem_id, request.body.text, request.body.photo, request.body.keyword1, request.body.keyword2, request.body.keyword3], function(error, info){
                      if(error == null){
                       response.json({ result : true, reason : "Success"});   
                      }
                      else
                          response.status(503).json({ result : false, reason : "Cannot post article" });
                    });
    
});

module.exports = router;
