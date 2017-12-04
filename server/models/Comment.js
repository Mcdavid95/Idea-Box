import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
  updatedAt: Date,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea'
  },
});
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
