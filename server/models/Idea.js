import mongoose from 'mongoose';

const ideaSchema = mongoose.Schema({
  title: String,
  description: String,
  updatedAt: Date,
  createdAt: { type: Date, default: Date.now },
  categories: { type: Array, required: true },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});
const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
