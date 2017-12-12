import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const ideaSchema = mongoose.Schema({
  title: String,
  description: String,
  updatedAt: Date,
  createdAt: { type: Date, default: Date.now },
  categories: String,
  status: { type: String, default: 'private' },
  modified: { type: Boolean, default: false },
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
ideaSchema.plugin(mongoosePaginate);
ideaSchema.index({ title: 'text', description: 'text' });
const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
