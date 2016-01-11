var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});

router.get('/getLikePostList', function (request, response) {
    connection.query('select * from post p, like l where p.post_id = l.post_id and l.post_id is not null and l.mem_id = ?; ', [request.params.mem_id], function (error, cursor){
    if(cursor.length > 0){
        response.json(cursor);   
    }
    else
        response.status(503).json({ result : false, reason : "Cannot find selected LikePostList" });
    
    });
    
    
});

module.exports = router;