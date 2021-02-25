import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
    {
        title: String,
        imageUrl: String,
        text: String,
        description: String,
        createdAt: String,
    },
    {
        timestamp: true
    }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;