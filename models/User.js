const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    //对密码加密   安装模块bcrypt
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    }
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  identify: {
    type: String,
    require: true
  }
});

const Person = mongoose.model("users", UserSchema);
module.exports = Person;
