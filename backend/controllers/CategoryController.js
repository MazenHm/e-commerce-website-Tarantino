const Category = require("../models/Category");

module.exports = {

        addCategory: async function (req,res){
            const {name , description} = req.body
            if (!name || !description){
                res.status(400).json({
                    status: 400,
                    message: "All fields are required!",
                  });
                  return;
            }
            const category = new Category(req.body)
            await category.save()
            res.send({category})
            
        },
        getAllCategory:  async function (req,res){
            try{
                address = await Category.find();
                res.send(address);
            }
            catch(err){
                res.send(err);
            }
          },
    
          getCategory:  async function  (req,res){
            try{
                myid= req.params.id;
                add = await Category.findOne({_id:myid})
                res.send(add)
            }
            catch{
                (err)=>{
                    res.send(err)
                }
            }
        },
    
        deleteCategory: async function (req,res){
            try{
            myid=req.params.id;
            add=await Category.deleteOne({_id:myid})
            res.send(add);
            }
            catch{
                (err)=>{
                    res.send(err);
                }
            }
            },
    
            updateCategory: async function(req,res){
                try{
                    myid=req.params.id;
                    newData=req.body;
            
                    updated = await Category.findByIdAndUpdate({_id:myid}, newData);
                    res.send(updated)
                }
                catch{
                    (err)=>{
                        res.send(err);
                    }
                }
            }
}
