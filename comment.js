//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comment'
});
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//API: GET /comments
app.get('/comments', function (req, res) {
    connection.query('SELECT * FROM comments', function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            res.json(results);
        }
    });
});

//API: POST /comment
app.post('/comment', function (req, res) {
    const comment = req.body.comment;
    connection.query('INSERT INTO comments(comment) VALUES(?)', [comment], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            res.send('success');
        }
    });
});

//API: DELETE /comment
app.delete('/comment', function (req, res) {
    const id = req.query.id;
    connection.query('DELETE FROM comments WHERE id = ?', [id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            res.send('success');
        }
    });
});

//create server
const server = http.createServer(app);
const port = 3000;
server.listen(port, function () {
    console.log('server is running on port ' + port);
});