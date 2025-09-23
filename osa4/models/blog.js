const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  url:   { type: String, required: true },
  likes: { type: Number, default: 0 }, 
});

blogSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = model('Blog', blogSchema);
