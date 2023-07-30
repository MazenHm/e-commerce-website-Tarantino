const Frames = require("../models/Frame");
const fs = require("fs");

module.exports = {
  addFrames: async function (req, res) {
    const { name, type,color, price, image } = req.body;
    if ((!name, !type, !color, !price, !image)) {
      res.status(400).json({
        status: 400,
        message: "All fields are required!",
      });
      return;
    }
    let imageURL;
    if (image) {
      try {
        let images = new Buffer.from(
          image.substring(image.indexOf(",") + 1),
          "base64"
        );
        let imgExtension = image.substring(
          image.indexOf("/") + 1,
          image.indexOf(";")
        );
        fs.writeFile(`public/images/${name}.${imgExtension}`, images, (err) => {
          if (err) {
            res.status(400).json({
              status: 400,
              message: "Error Saving Image",
            });
            return;
          }
        });
        imageURL = `/images/${name}.${imgExtension}`;
      } catch {
        res.status(400).json({
          status: 400,
          message: "Error Saving Image",
        });
        return;
      }
    }
    let data = { ...req.body };
    data.image = imageURL;
    const frames = new Frames(data);
    const result = await frames.save();
    if (frames) {
      res.send({ frames });
    } else {
      res.send({ message: "frame is required!!" });
    }
  },

  getAllFrames: async function (req, res) {
    try {
      frame = await Frames.find();
      res.send(frame);
    } catch (err) {
      res.send(err);
    }
  },

  deleteFrame: async function (req, res) {
    const { id } = req.params;

    try {
      const result = await Frames.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).send({ message: "Frame not found" });
      }

      res.send({ message: "Frame deleted successfully" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  updateFrame: async function (req, res){
    const { id } = req.params;
    try{
      let imageURL = req.body.image;
      if (req.body.image && req.body.image.includes('base64')){
        let image = req.body.image;

        let images = new Buffer.from(
          image.substring(image.indexOf(",") + 1),
          "base64"
        );
        let imgExtension = image.substring(
          image.indexOf("/") + 1,
          image.indexOf(";")
        );
        fs.writeFile(`public/images/${req.body.name}.${imgExtension}`, images, (err) => {
          if (err) {
            res.status(400).json({
              status: 400,
              message: "Error Saving Image",
            });
            return;
          }
        });
        imageURL = `/images/${req.body.name}.${imgExtension}`;
      }
      let data = {...req.body,image:imageURL}
      
      let response = await Frame.findByIdAndUpdate({_id : id},data)
      res.send(response)
    }catch(err){
      res.status(500).json({status : 500, message : "server error"})
    }
  }
};
