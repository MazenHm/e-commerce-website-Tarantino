const Announce = require("../models/Announce");

module.exports = {
  addAnnounce: async function (req, res) {
    const { description } = req.body;
    if (!description) {
      res.status(400).json({
        status: 400,
        message: "all field are required",
      });
      console.log(description);
      return;
    }
    const announce = new Announce(req.body);
    await announce.save();
    res.send({ announce });
    console.log(announce);
  },

  getAllAnnounces: async function (req, res) {
    try {
      announce = await Announce.find();
      res.send(announce);
    } catch (err) {
      res.send(err);
    }
  },

  getAnnounce: async function (req, res) {
    try {
      myid = req.params.id;
      add = await Announce.findOne({ _id: myid });
      res.send(add);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },

  deleteAnnounce: async function (req, res) {
    try {
      myid = req.params.id;
      add = await Announce.deleteOne({ _id: myid });
      res.send(add);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },

  updateAnnounce: async function (req, res) {
    try {
      myid = req.params.id;
      newData = req.body;

      updated = await Announce.findByIdAndUpdate({ _id: myid }, newData);
      res.send(updated);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },
};
