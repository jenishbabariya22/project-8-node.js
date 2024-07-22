const categorymodel = require('../models/categorymodel')
const subcategorymodel = require('../models/subcategorymodel')
const exsubcategorymodel = require('../models/exsubcategorymodel ')
const productmodel = require('../models/productmodel')


const exsubcategory = async(req,res) => {
    try{
        let exsubcategory = await exsubcategorymodel.find({}).populate('categoryid').populate('subcategoryid')

        return res.render('exsubcategory/exsubcategory',{
            exsubcategory
        })
    }catch(err){
        console.log(err);
        return false
    }
    
}

const addexsubcategory = async(req,res) => {
    try{
        let category = await categorymodel.find({});
        let subcategory = await subcategorymodel.find({});
        
        return res.render('exsubcategory/addexsubcategory',{
            category,subcategory
        })
    }catch(err){
        console.log(err);
        return false
    }
   
}

const postexsubcategory = async(req,res) => {
    try{
        let all = await  exsubcategorymodel.create({
            categoryid : req.body.category ,
            subcategoryid :   req.body.subcategory,
            exsubcategory : req.body.exsubcategory
        })
        req.flash('add',"extracategory successfully add")
        return res.redirect('/exsubcategory')
    }catch(err){
        console.log(err);
        return false
    }
}

const deleteexsubrecord = async(req,res) => {
    try{
        let all = await exsubcategorymodel.findByIdAndDelete(req.params.id)

        await productmodel.deleteMany({ exsubcategoryid : req.params.id})
        req.flash('success',"extracategory successfully Deleted")
        return res.redirect('/exsubcategory')
    }catch(err){
        console.log(err);
        return false
    }
}

const editexsubrecord = async(req,res) => {
    try{
        let record = await exsubcategorymodel.findById(req.query.id).populate('categoryid').populate('subcategoryid')
        let category = await categorymodel.find({});
        let subcategory = await subcategorymodel.find({});

        return res.render('exsubcategory/editexsubcategory',{
            record,category,subcategory
        })
    }catch(err){
        console.log(err);
        return false
    }
}
const editexsubcategory = async(req,res) => {
    try{

        let all = await exsubcategorymodel.findByIdAndUpdate(req.body.id,{
            categoryid : req.body.category,
            subcategoryid : req.body.subcategory,
            exsubcategory : req.body.exsubcategory
        })
        req.flash('update',"extracategory successfully Updated")
        return res.redirect('/exsubcategory')
    }catch(err){
        console.log(err);
        return false
    }
}

const instock = async(req,res) => {
    try{    
        let id = req.query.id;
       
        let all = await exsubcategorymodel.findByIdAndUpdate(id,{
            status : 0
        })
            return res.redirect('/exsubcategory')

    }catch(err){
        console.log(err);
        return false
    }
}

const outstock = async(req,res) => {
    try{    
        let id = req.query.id;
       
        let all = await exsubcategorymodel.findByIdAndUpdate(id,{
            status : 1
        })
        return res.redirect('/exsubcategory')



    }catch(err){
        console.log(err);
        return false
    }
}
module.exports = {
    exsubcategory,addexsubcategory,postexsubcategory,deleteexsubrecord,editexsubrecord,editexsubcategory,outstock,instock
}