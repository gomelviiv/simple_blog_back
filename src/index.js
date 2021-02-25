import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import PostControllers from './controllers/PostControllers'
const Post = new PostControllers();


const app = express();
mongoose.connect('mongodb://localhost:27017/blog')

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin','*');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type,Accept, x-access-token');
  
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/posts', Post.index)
app.post('/posts', Post.create)
app.get('/posts/:id', Post.read)
app.delete('/posts/:id', Post.delete)
app.put('/posts/:id', Post.update)

app.listen(8003, function(){
    console.log('SERVER STARTED!')
})

