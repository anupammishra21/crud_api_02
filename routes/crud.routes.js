const router = require('express').Router()
const crudController = require('../controller/crud.controller')
const path = require('path')
const multer = require('multer')
const { error } = require('console')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + 'anupam_mishra' + uniqueSuffix + path.extname(file.originalname))
    }
})
const maxSize = 100

const uploads = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb (new Error('only jpg,jpeg and png file are allowed'))
        }
    },
    limits:maxSize
})


router.get('/',crudController.welcomeStatus)
router.post('/insert', uploads.single('image'),crudController.insertData)
router.get('/list',crudController.listData)
router.get('/:id',crudController.singleData)
router.put('/:id',crudController.updateData)
router.delete('/:id',crudController.deleteData)

module.exports= router
