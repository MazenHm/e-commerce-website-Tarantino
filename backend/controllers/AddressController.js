const Address = require("../models/Address");

module.exports = {
addAddress: async function(req,res){
    const {postalCode,line,city,state} = req.body;

    if (!postalCode || !line || !city || !state){
        res.status(400).json({
            status: 400,
            message: "All fields are required!",
          });
          return;
    }
    const address = new Address(req.body)
    await address.save()
    res.send({address})
    
    },

    getAllAddress:  async function (req,res){
        try{
            address = await Address.find();
            res.send(address);
        }
        catch(err){
            res.send(err);
        }
      },

      getAddress:  async function  (req,res){
        try{
            myid= req.params.id;
            add = await Address.findOne({_id:myid})
            res.send(add)
        }
        catch{
            (err)=>{
                res.send(err)
            }
        }
    },

    deleteAddress: async function (req,res){
        try{
        myid=req.params.id;
        add=await Address.deleteOne({_id:myid})
        res.send(add);
        }
        catch{
            (err)=>{
                res.send(err);
            }
        }
        },

        updateAddress: async function(req,res){
            try{
                myid=req.params.id;
                newData=req.body;
        
                updated = await Address.findByIdAndUpdate({_id:myid}, newData);
                res.send(updated)
            }
            catch{
                (err)=>{
                    res.send(err);
                }
            }
        }

}