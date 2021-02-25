'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _PostControllers = require('./controllers/PostControllers');

var _PostControllers2 = _interopRequireDefault(_PostControllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = new _PostControllers2.default();

var app = (0, _express2.default)();
_mongoose2.default.connect('mongodb://localhost:27017/blog');

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type,Accept, x-access-token');

    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/posts', Post.index);
app.post('/posts', Post.create);
app.get('/posts/:id', Post.read);
app.delete('/posts/:id', Post.delete);
app.put('/posts/:id', Post.update);

app.listen(8003, function () {
    console.log('SERVER STARTED!');
});