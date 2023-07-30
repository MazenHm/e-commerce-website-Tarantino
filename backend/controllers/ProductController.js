const fs = require("fs");
const Product = require("../models/Product");
const ProductOption = require("../models/ProductOption");
module.exports = {
  addProduct: async function (req, res) {
    const { name, description, option, categoryId, images } = req.body;
    if (!name || !description || !option || !categoryId || !images) {
      res.status(400).json({
        status: 400,
        message: "All fields are required!",
      });
      return;
    }

    let imagesURL = [];
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        try {
          let image = new Buffer.from(
            images[i].substring(images[i].indexOf(",") + 1),
            "base64"
          );
          let imgExtension = images[i].substring(
            images[i].indexOf("/") + 1,
            images[i].indexOf(";")
          );

          fs.writeFile(
            `public/images/${name}-${i}.${imgExtension}`,
            image,
            (err) => {
              if (err) {
                res.status(400).json({
                  status: 400,
                  message: "Error Saving Image",
                });
                return;
              }
            }
          );
          imagesURL.push({ url: `/images/${name}-${i}.${imgExtension}` });
        } catch {
          res.status(400).json({
            status: 400,
            message: "Error Saving Image",
          });
          return;
        }
      }
    }


    let result = []
    if(option && option.length>0){
        for(let i =0; i < option.length;i++){
          const options = new ProductOption(option[i]);
          let prodOption = await options.save();
          result.push(prodOption)
        }
    }

  
    const data = req.body;
    if (result && result.length>0) {
      data.option =result
      data.images = imagesURL;
      const product = new Product(data);
      await product.save();
      res.send({ product });
    } else {
      res.send({ message: "product option is required!!" });
    }
  },

  getAllProducts: async function (req, res) {
    try {
      product = await Product.find()
        .populate({ path: "option", model: "ProductOption" })
        .populate({ model: "Category", path: "categoryId" });
      res.send(product);
    } catch (err) {
      res.send(err);
    }
  },

  getLastProducts: async function (req, res) {
    try {
      product = await Product.find()
        .populate({ path: "option", model: "ProductOption" })
        .populate({ model: "Category", path: "categoryId" })
        .limit(5)
        .sort({ created_at: -1 });
      res.send(product);
    } catch (err) {
      res.send(err);
    }
  },

  getProduct: async function (req, res) {
    try {
      myid = req.params.id;
      product = await Product.findOne({ _id: myid })
        .populate({ path: "option", model: "ProductOption" })
        .populate({ model: "Category", path: "categoryId" });
      res.send(product);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },

  deleteProduct: async function (req, res) {
    try {
      myid = req.params.id;
      product = await Product.deleteOne({ _id: myid });
      res.send(product);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },

  updateProduct: async function (req, res) {
    try {
      const myid = req.params.id;
      const { name, description, option, categoryId, images } = req.body;

      let oldImages = [];
      let imagesURL = [];
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          try {
            if (images[i].indexOf("base64") != -1) {
              let image = new Buffer.from(
                images[i].substring(images[i].indexOf(",") + 1),
                "base64"
              );
              let imgExtension = images[i].substring(
                images[i].indexOf("/") + 1,
                images[i].indexOf(";")
              );

              fs.writeFile(
                `public/images/${name}-${i}.${imgExtension}`,
                image,
                (err) => {
                  if (err) {
                    res.status(400).json({
                      status: 400,
                      message: "Error Saving Image",
                    });
                    return;
                  }
                }
              );
              imagesURL.push({ url: `/images/${name}-${i}.${imgExtension}` });
            } else {
              let oldImage = images[i].replace("http://localhost:8080", "");
              imagesURL.push({ url: oldImage });
            }
            console.log(imagesURL);
          } catch {
            res.status(400).json({
              status: 400,
              message: "Error Saving Image",
            });
            return;
          }
        }
      }


      let result = []
      if(option && option.length>0){
          for(let i =0; i < option.length;i++){
            const options = new ProductOption(option[i]);
            let prodOption = await options.save();
            result.push(prodOption)
          }
      }

      
      console.log(result)
      // Check if option is being updated
      if (result && result.length>0) {
        
        
      const updatedData = {
        name,
        description,
        categoryId,
        images: imagesURL,
        option : result
      };
      
      

      // Update the product in the database
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: myid },
        updatedData,
        { new: true }
      )
        .populate({ path: "option", model: "ProductOption" })
        .populate({ model: "Category", path: "categoryId" });

      res.send(updatedProduct);
    }
    } catch (err) {
      res.send(err);
    }
  },
};
