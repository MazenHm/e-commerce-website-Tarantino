const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/auth");
const Address = require("../models/Address");
module.exports = {
  addUser: async function (req, res) {
    const { fullname, email, password, phone } = req.body;

    if (!fullname || !email || !password || !phone) {
      res.status(400).json({
        status: 400,
        message: "All fields are required!",
      });
      return;
    }

    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (user) {
        res.status(400).json({
          status: 400,
          message: "Email already exist!",
        });
        return;
      }

      const usr = new User(req.body);
      salt = bcrypt.genSaltSync(10);
      crtyptedPass = await bcrypt.hashSync(password, salt);
      usr.password = crtyptedPass;
      await usr.save();
      res.status(200).json({
        status: 200,
        message: "User added successfully!",
      });
    } catch {
      res.status(500).json({
        status: 500,
        message: "Error server!",
      });
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 400,
        message: "All fields are required!",
      });
      return;
    }
    const user = await User.findOne({ email });

    try {
      console.log(user);
      if (!user)
        res.status(500).json({
          status: 500,
          message: "Email doesn't exist!",
        });

      const validatPassword = await bcrypt.compare(password, user.password);
      if (!validatPassword) {
        res.status(400).json({ status: 400, message: "Wrong Password!" });
        return;
      } else {
        let token = createToken(user);

        res.status(200).json({
          status: 200,
          token: token,
          message: "User Loged In successfully!",
          role: user.role,
        });
      }
    } catch {
      res.status(500).json({
        status: 500,
        message: "Error server!",
      });
    }
  },

  getAllUsers: async function (req, res) {
    try {
      users = await User.find();
      res.send(users);
    } catch (err) {
      res.send(err);
    }
  },
  //get by id
  getUserById: async function (req, res) {
    try {
      myid = req.params.id;
      user = await User.findOne({ _id: myid });
      res.send(user);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },
  getConnectedUser: async function (req, res) {
    try {
      myid = req.id;
      user = await User.findOne({ _id: myid }).populate({
        path: "addressId",
        model: "Address",
      });
      res.send(user);
      // user = await User.findOne({ _id: myid });
      // res.send(user);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },
  // delete by id
  deleteUser: async function (req, res) {
    try {
      myid = req.params.id;
      user = await User.deleteOne({ _id: myid });
      res.send({ message: "user deleted succesfuly" });
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },
  // update
  updateUser: async function (req, res) {
    try {
      myid = req.params.id;
      let newData = req.body;
      let address;
      if (req.body.address) {
        address = new Address(req.body.address);
        await address.save();
        console.log(address);

        newData = { ...newData, addressId: address._id };
      }
      console.log(newData);
      if (req.body.password) {
        salt = bcrypt.genSaltSync(10);
        crtyptedPass = await bcrypt.hashSync(req.body.password, salt);

        newData.password = crtyptedPass;
      }

      updated = await User.findByIdAndUpdate({ _id: myid }, newData);
      res.send(updated);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },
};
