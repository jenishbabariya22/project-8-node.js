const categorymodel = require('../models/categorymodel')
const subcategorymodel = require('../models/subcategorymodel')
const exsubcategorymodel = require('../models/exsubcategorymodel ')
const productmodel = require('../models/productmodel')


const subcategory = async(req,res) => {
    try{
        let subcategory = await subcategorymodel.find({}).populate('categoryid')

        return res.render('subcategory/subcategory',{
            subcategory
        })
    }catch(err){
        console.log(err);
        return false
    }
    
}

const addsubcategory = async(req,res) => {
    try{
        let category = await categorymodel.find({});
        return res.render('subcategory/addsubcategory',{
            category
        })
    }catch(err){
        console.log(err);
        return false
    }
   
}

const postsubcategory = async(req,res) => {
    try{
        let all = await  subcategorymodel.create({
            categoryid : req.body.category ,
            subcategory :   req.body.subcategory
        })
        req.flash('add',"subcategory successfully add")
        return res.redirect('/subcategory')
    }catch(err){
        console.log(err);
        return false
    }
}

const deletesubrecord = async(req,res) => {
    try{
        let id = req.params.id
        let all = await subcategorymodel.findByIdAndDelete(id)

        await exsubcategorymodel.deleteMany({ subcategoryid : id})
        await productmodel.deleteMany({ subcategoryid : id})
        req.flash('success',"subcategory successfully Deleted")
        return res.redirect('/subcategory')
    }catch(err){
        console.log(err);
        return false
    }
}

const editsubrecord = async(req,res) => {
    try{
        let record = await subcategorymodel.findById(req.query.id).populate('categoryid')
        let category = await categorymodel.find({})

        return res.render('subcategory/editsubcategory',{
            record,category
        })
    }catch(err){
        console.log(err);
        return false
    }
}
const editsubcategory = async(req,res) => {
    try{

        let all = await subcategorymodel.findByIdAndUpdate(req.body.id,{
            categoryid : req.body.category,
            subcategory : req.body.subcategory
        })
        req.flash('update',"subcategory successfully Updated")
        return res.redirect('/subcategory')
    }catch(err){
        console.log(err);
        return false
    }
}

const instock = async(req,res) => {
    try{    
        let id = req.query.id;
       
        let all = await categorymodel.findByIdAndUpdate(id,{
            status : 0
        })
            return res.redirect('/subcategory')

    }catch(err){
        console.log(err);
        return false
    }
}

const outstock = async(req,res) => {
    try{    
        let id = req.query.id;
       
        let all = await categorymodel.findByIdAndUpdate(id,{
            status : 1
        })
        return res.redirect('/subcategory')



    }catch(err){
        console.log(err);
        return false
    }
}
module.exports = {
    subcategory,addsubcategory,postsubcategory,deletesubrecord,editsubrecord,editsubcategory,outstock,instock
}