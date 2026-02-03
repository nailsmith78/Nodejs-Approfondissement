const User = require("./users.model");
const bcrypt = require("bcrypt");

class UserService {
  getAll() {
    return User.find({}, "-password");
  }
  get(id) {
    return User.findById(id, "-password");
  }
  create(data) {
    const user = new User(data);
    return user.save();
  }
  update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return User.deleteOne({ _id: id });
  }
  async checkPasswordUser(email, password) {
    console.log("email/password ", email, ' ', password);
    const user = await User.findOne({ email });
    console.log("check psw : ", user);
    if (!user) {
      return false;
    }
    const bool = await bcrypt.compare(password, user.password);
    console.log("check cryt : ", bool);
    if (!bool) {
      return false;
    }
    return user._id;
  }
}

module.exports = new UserService();
