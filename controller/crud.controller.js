const { isEmpty } = require('underscore')
const crudModel = require('../model/crud.model')
const fs = require('fs')


class crudController{

    async welcomeStatus(req,res){
        try{
            res.status(200).json({
                msg:"Welcome"
            })



        }catch(err){
            throw err
        }

    }


    // insert data section 

    async insertData(req,res){
        try{

            if(_.isEmpty(req.body.name)){
                res.status(400).json({
                    msg:"Name is Required"
                })
            }

            if(_.isEmpty(req.body.email)){
                res.status(400).json({
                    msg:"Email is Required"
                })
            }

            let isEmailExist = await crudModel.findOne({email:req.body.email})

            if(!_.isEmpty(isEmailExist)){

                res.status(400).json({
                    msg:"this email is already exists",
                    data:[]
                })

            }

            if(req.file){
                req.body.image = req.file.filename
            }

            let saveData = await crudModel.create(req.body)

            if(!_.isEmpty(saveData) && saveData._id){
                res.status(200).json({
                    msg:"data saved successfully",
                    data:saveData
                })
            }else{

                res.status(400).json({
                    msg:'something went wrong',
                    data:[]
                })

            }

        }catch(err){
            throw err
        }


    }

    async listData(req,res){
        try{
            let allData = await crudModel.find({isDeleted:false})
            // console.log("allData",allData);

            if(!_.isEmpty(allData)){
                res.status(200).json({
                    message:"Data Fetching Sucessfully",
                    data:allData
                })
            }else{
                res.status(400).json({
                    message:"something went wrong "
                })

            }


        }catch(err){
            throw err

        }

    }

    // single data fetching section 

    async singleData(req,res){
       try{
        let singleData = await crudModel.findOne({_id:req.params.id})
        // console.log("single data is",singleData);

        if (singleData) {
            res.status(200).json({
                msg:"single data fetching sucessfully ",
                data:singleData
            })
        }

        else{
            res.status(400).json({
                msg:"something went wrong",
                data:[]
            })
        }
    

       }catch(err){
        throw err
       }
    }

    async updateData(req,res){
        try{
            let userDetails = await crudModel.findOne({_id:req.params.id})
            // console.log("userDetails",userDetails);

            let updatedObj ={
                name:req.body.name,
                email:req.body.email,
            }

            if(req.file){
                updatedObj.iamge = req.file.filename
                fs.unlinkSync(`./public/uploads/${userDetails.image}`)
            }

            let updatedData = await crudModel.findByIdAndUpdate(req.params.id,updatedObj)
            // console.log("updatedDataIs",updatedData);

            if (updatedData) {
                res.status(200).json({
                    msg:"Data updated sucessfully",
                    data:updatedData
                })
                
            }else{

                res.status(400).json({
                    message:"bad credentials",
                    data:[]
                })

            }

        }catch(err){
            throw err
        }

    }

    // delete Data section 

    async deleteData(req,res){
        try{
            let deletedObj = {
                isDeleted:true
            }

            let deleteData = await crudModel.findByIdAndDelete(req.params.id,deletedObj)
            if(deleteData){
                res.status(200).json({
                    message:" data has been deleted",
                    data:deleteData

                })
            }

        }catch(err){
            throw err
        }

    }

}

module.exports = new crudController()
