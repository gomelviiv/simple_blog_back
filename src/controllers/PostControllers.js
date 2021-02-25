import PostModel from '../models/Post'

class PostControllers {
    index(req,res){
        PostModel.find().then((err, posts)=>{
            if(err){
                res.send(err);
            }
    
            res.json(posts)
        })
    }

    create(req, res) {
        const data = req.body.data

        const post = new PostModel({
            title: data.title,
            imageUrl: data.imageUrl,
            text: data.text,
            description: data.description,
            createdAt: new Date()
        });
        post.save().then(()=>{
            res.send({status: "OK!"})
        })
    
    }

    read(req,res) {
        PostModel.findOne({_id:req.params.id}).then((post)=>{
            if(!post){
                res.send({error: "not found"});
            } else {
                res.json(post)
            }
        })
    }

    update(req,res){
        PostModel.findByIdAndUpdate(req.params.id, {$set: req.body.data}, (err)=>{
            if(err){
                res.send(err);
            }
            res.json({status: "updated"});
        })
    }

    delete(req,res){
        PostModel.remove({
            _id: req.params.id
        }).then(post =>{
            if(post){
                res.json({ status: "deleted"})
            } else {
                res.json({status: "error"})
            }
        })
    }
}

export default PostControllers;
