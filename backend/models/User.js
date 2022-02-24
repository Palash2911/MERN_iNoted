const mongoose =  require('mongoose');
const { Schema } = mongoose;

//  Created Schemas - This data will go to MongoDB
const UserSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
  });

  // Fixes the double user problem - No same user can be entered - not prefered because getting double index
  const users = mongoose.model('user', UserSchema);
//   users.createIndexes();

  module.exports = users;