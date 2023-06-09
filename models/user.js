const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // users가 됨 밑에 코드 없으면
    collection: 'mongoose-user',
  },
);

module.exports = mongoose.model('User', userSchema);
