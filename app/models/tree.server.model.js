var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TreeSchema = new Schema({
  created: {
type: Date,
    default: Date.now
  },
title: {
  type: String,
  default: '',
  trim: true,
  required: 'Title cannot be blank'
},
content: {
  type: String,
  default: '',
},
data: {
  type: String,
  default: '',
},
creator: {
type: Schema.ObjectId,
ref: 'User' }
});
mongoose.model('Tree', TreeSchema);