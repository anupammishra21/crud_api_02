const { Timestamp } = require('bson')
const mongoose = require('mongoose')
const { type } = require('os')

const schemae = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    image:{type:String,require:true},
    isDeleted:{type:Boolean,enum:[true,false],default:false}
},{
    Timestamps:true,
    versionKey:false
})

module.exports = mongoose.model('crudApi',schemae)