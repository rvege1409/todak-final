var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});

router.get('/deleteComment', function (request, response) {
    
    connection.query('delete from comment where post_id = ? and mem_id = ?;', [request.params.post_id, request.params.mem_id], function(error, info){
      if(error == null)
        response.json({ result : true, reason : "Success"});
                      
    else      
        response.status(503).json({ result : false, reason : "Invaild process" });
    });
    });
module.exports = router;