const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    require: true
  },
  expend: {
    type: String,
    require: true
  },
  cash: {
    type: String,
    require: true
  },
  remark: {
    type: String
  },
  data: {
    type: String,
    default: Date.now()
  }
});

const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
