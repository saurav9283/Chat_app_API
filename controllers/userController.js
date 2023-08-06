const User = require("../model/userModel.js");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      // console.log( username)
      if (usernameCheck)
        return  res.status(203).send("Username already used");
        // return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.status(203).send("Email already used");
        // return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await brcypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      // return res.status(200).send(req.body)
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };