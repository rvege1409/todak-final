var express = require('express');
//var fs = require('fs');

var ejs = require('ejs');
var mysql = require('mysql');
var body_parser = require('body-parser');

//var Connect = require('connect');
var router = express.Router();

var connection = mysql.createConnection({
    host : 'todak-db.cckftpisl8iv.us-west-2.rds.amazonaws.com',
    user : 'master',
    password : '1q2w3e4r',
    database : 'mydb'
});

//var connect = new Connect();
//var router = new Router();

//connect.use(body_parser.urlencoded({ 'extended' : true }));

/*** 글 보내기 */
router.post('/insertPost', function (request, response) {

    connection.query('insert into post( mem_id, text, photo, post_date, keyword1, keyword2, keyword3) values(?,?,?,sysdate,?,?,?);',
                  [ request.body.mem_id, request.body.text, request.body.photo, request.body.keyword1, request.body.keyword2, request.body.keyword3 ]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.end();
});

/*** 사용자 id 찾기 */
router.get('/getMemberId', function (request, response) {

    connection.query('select mem_id from member where hash = ?;', [request.params.hash]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.json(response);
    response.end();
});

/**** 오늘 받을 글 받아오기 */
router.get('/getPost/:mem_id', function (request, response) {

    connection.query('select * from post where post_date > curdate() and mem_id != ? order by rand() limit 1;', [request.params.mem_id]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.json(response);
    //response.end();
});

/* 공유함 글 받아오기 (fix me : 다음 글 순서는 어떻게...? 소라 누나!)* 맨마지막에 함/
router.get('/getShareList', function (request, response) {
    connection.query('select * from post where TO_DAYS(NOW()) - TO_DAYS(post_date) <= 7 order by rand() limit 10;', [request.params.mem_id]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.json(response);
    response.end();
});

/**** 공유함 - 댓글 가져오기 */
router.get('/getShareListComment', function (request, response) {
    
    connection.query('select * from post p, comment c where p.post_id = c.post_id and post_id = ?;', [request.params.post_id]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.json(response);
    response.end();
});


/**** 내가 보낸 글 목록 가져오기 */
router.get('/getSendPostList', function (request, response) {
    
    connection.query('select * from post where mem_id = ?; ', [request.params.mem_id]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.json(response);
    response.end();
});

/**** 내가 좋아요 한 글 목록 가져오기 */
router.get('/getLikePostList', function (request, response) {
    
    connection.query('select * from post p, like l where p.post_id = l.post_id and l.post_id is not null and l.mem_id = ?; ', [request.params.mem_id]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.json(response);
    response.end();
});


/***** 최초 로그인 시 사용자 id 부여하기 */
router.post('/insertMemberId', function (request, response) {

    connection.query('insert into member(hash) values(?);',
                  [ request.body.hash ]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.end();
});

/**** 좋아요 누르기 */
router.post('/insertLike', function (request, response) {

    connection.query('insert into like values(?,?);',
                  [ request.body.post_id, request.body.mem_id ]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.end();
});

/**** 좋아요 취소 */
router.get('/deleteLike', function (request, response) {
    
    connection.query('delete from like where post_id = ? and mem_id = ?;', [request.params.post_id, request.params.mem_id]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.end();
});

/**** 댓글 달기 */
router.post('/insertComment', function (request, response) {

    connection.query('insert into comment values(?,?,?,sysdate);',
                  [ request.body.post_id, request.body.mem_id, request.body.text_comment ]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.end();
});

/***** 댓글 삭제 */
router.get('/deleteComment', function (request, response) {
    
    connection.query('delete from comment where post_id = ? and mem_id = ?;', [request.params.post_id, request.params.mem_id]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.end();
});
module.exports = router;
//connect.use(router);
//connect.listen(8080, function () {

//    console.log("Server running on port 8080 :)");
//});